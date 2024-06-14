using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Agents.Services;
using System.Text;
using Microsoft.SemanticKernel;
using AdventureWorks.Shop.AI.Agents.Prompts;
using System.Text.Json;
using Newtonsoft.Json;
using AdventureWorks.Shop.AI.Milvus;
using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Enums;
using StackExchange.Redis;
using Microsoft.CodeAnalysis.Differencing;
using Milvus.Client;

namespace AdventureWorks.Shop.AI.Agents.Routers
{
    public class AgentRouter : IAgentRouter
    {
        private readonly IServiceProvider _keyedServiceProvider;
        private readonly ServicesOptions _servicesOptions;
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;
        private readonly IConversationHistoryService _conversationHistoryService;
        private readonly IMessageRoutes _messageRoutes;
        private readonly IConnectionMultiplexer _connectionMultiplexer;
        private readonly IDatabase _db;

        public AgentRouter(IServiceProvider keyedServiceProvider,
            IOptions<ServicesOptions> servicesOptions,
            IOptions<AIServiceOptions> aiOptions,
            IConversationHistoryService conversationHistoryService,
            IMessageRoutes messageRoutes,
            IConnectionMultiplexer connectionMultiplexer)
        {
            _keyedServiceProvider = keyedServiceProvider;
            _servicesOptions = servicesOptions.Value;
            _aiOptions = aiOptions.Value;
            _conversationHistoryService = conversationHistoryService;
            _messageRoutes = messageRoutes;
            _connectionMultiplexer = connectionMultiplexer;
            _db = _connectionMultiplexer.GetDatabase();

            _settings = new()
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
                MaxTokens = 1000,
                Temperature = 0
            };

            // Create a kernel with OpenAI chat completion
            IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

            kernelBuilder.AddOpenAIChatCompletion(
                    modelId: AIModels.GPT_4_Turbo,
                    apiKey: _aiOptions.Key);

            _kernel = kernelBuilder.Build();

        }

        public async Task<IAgent> Query(Message ask)
        {
            var route = AgentRouteConstants.Unknown;

            string? cachedRoute = _db.StringGet(ask.Content);

            if (cachedRoute is not null)
            {
                route = cachedRoute;
            }
            else
            {
                route = await GetRoute(ask);
            }

            var agent = _keyedServiceProvider.GetRequiredKeyedService<IAgent>(route);

            return agent;
        }

        private async Task<string?> GetRoute(Message ask)
        {
            var assistantRoute = AgentRouteConstants.Unknown;
            KernelArguments arguments = new(_settings);
            
            var messageRoute = await _messageRoutes.MessageRoute(ask);

            var conversation = await _conversationHistoryService.GetConversationAsync(ask.ConversationId);

            var messageSummary = MessageSummary(conversation);

            var messageVariables = conversation.Messages.Where(w => w.User.Id == AuthorRoles.Assistant.ToString()).Select(s => s.MessageVariables).LastOrDefault(); 

            if (messageVariables is not null && messageVariables.Count > 0)
            {
                assistantRoute = messageVariables.FirstOrDefault(pair => pair.Key == AgentRouteConstants.MessageVariableName).Value;
            }

            arguments.Add("current_route_hint", messageRoute);
            arguments.Add("last_route_hint", assistantRoute);
            arguments.Add("message_list", messageSummary);

            var prompt = AgentPrompts.ControllerPrompt;

            var result = await _kernel.InvokePromptAsync(prompt, arguments);

            if (result is not null)
            {
                var response = JsonConvert.DeserializeObject<RouteResponse>(result.GetValue<string>() ?? "{ \"route\": \"unknown\" }");

                if (response?.Reply == false)
                {
                    _db.StringSet(ask.Content, response?.Route);
                }

                return response?.Route;
            }

            return assistantRoute;
        }

        private string MessageSummary(Conversation conversation)
        {
            var messages = conversation.Messages.Select(s => s).TakeLast(10);

            // get the messages summary
            var messageText = new StringBuilder();

            foreach (var message in messages)
            {
                if (message.User.Id == AuthorRoles.Assistant.ToString())
                {
                    messageText.AppendLine($"Assistant: {message.Content}");
                }
                else
                {
                    messageText.AppendLine($"User: {message.Content}");
                }
            }

            return messageText.ToString();
        }

        private class RouteResponse
        {
            [JsonProperty("route")]
            public string Route { get; set; } = string.Empty;

            [JsonProperty("reply")]
            public bool Reply { get; set; }
        }
    }
}
