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

namespace AdventureWorks.Shop.AI.Agents.Routers
{
    public class AgentRouter : IAgentRouter
    {
        private readonly IServiceProvider _keyedServiceProvider;
        private readonly ServicesOptions _servicesOptions;
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;
        private readonly IServiceProvider _serviceProvider;
        private readonly IMessageRoutes _messageRoutes;

        public AgentRouter(IServiceProvider keyedServiceProvider,
            IOptions<ServicesOptions> servicesOptions,
            IOptions<AIServiceOptions> aiOptions,
            IServiceProvider serviceProvider,
            IMessageRoutes messageRoutes)
        {
            _keyedServiceProvider = keyedServiceProvider;
            _servicesOptions = servicesOptions.Value;
            _aiOptions = aiOptions.Value;
            _serviceProvider = serviceProvider;
            _messageRoutes = messageRoutes;

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
            var route = string.Empty;

            if (ask.MessageVariables is not null &&
              ask.MessageVariables.FirstOrDefault(pair => pair?.Key == AgentRouteConstants.MessageVariableName) is not null)
            {
                var result = ask.MessageVariables.FirstOrDefault(pair => pair?.Key == AgentRouteConstants.MessageVariableName);

                if (result is not null && result?.Value.Length > 0)
                {
                    route = result?.Value;
                }
                else
                {
                    route = await GetRoute(ask);
                }
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
            KernelArguments arguments = new(_settings);

            using (var scope = _serviceProvider.CreateScope())
            {
                var conversationHistoryService = scope.ServiceProvider.GetRequiredService<IConversationHistoryService>();
                var messageRoute = await _messageRoutes.MessageRoute(ask);

                var conversation = await conversationHistoryService.GetConversationAsync(ask.ConversationId);

                var messageSummary = MessageSummary(conversation);

                var messageVariables = conversation.Messages.Where(w => w.User.Id == AuthorRoles.Assistant.ToString()).Select(s => s.MessageVariables).LastOrDefault();

                var assistantRoute = "unknown";

                if (messageVariables is not null && messageVariables.Count > 0)
                {
                    assistantRoute = messageVariables.FirstOrDefault(pair => pair?.Key == AgentRouteConstants.MessageVariableName).Value;
                }

                arguments.Add("current_route_hint", messageRoute);
                arguments.Add("last_route_hint", assistantRoute);
                arguments.Add("message_list", messageSummary);
            }

            var prompt = AgentPrompts.ControllerPrompt;

            var result = await _kernel.InvokePromptAsync(prompt, arguments);
            var response = JsonConvert.DeserializeObject<RouteResponse>(result.GetValue<string>());

            return response.Route;
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
        }
    }
}
