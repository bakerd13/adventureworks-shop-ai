using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Agents.Plugins;
using AdventureWorks.Shop.AI.Agents.Services;
using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Enums;
using AdventureWorks.Shop.AI.Agents.Routers;

namespace AdventureWorks.Shop.AI.Agents
{
    public class UnknownAgent : IAgent
    {
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;
        private readonly IConversationHistoryService _conversationHistoryService;

        public UnknownAgent(IOptions<AIServiceOptions> aiOptions, IConversationHistoryService conversationHistoryService)
        {
            _aiOptions = aiOptions.Value;
            _conversationHistoryService = conversationHistoryService;

            _settings = new()
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
                MaxTokens = 2000,
                Temperature = 0.1
            };

            // Create a kernel with OpenAI chat completion
            IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

            kernelBuilder.AddOpenAIChatCompletion(
                    modelId: AIModels.GPT_4_Turbo,
                    apiKey: _aiOptions.Key);

            kernelBuilder.Plugins.AddFromType<TimeInformation>();

            _kernel = kernelBuilder.Build();

        }

        public async IAsyncEnumerable<MessageDTO> Ask(Message ask)
        {
            var message = ask.ToAgentMessageDTO();
            message.MessageType = MessageType.Message;

            if (message.MessageVariables is null)
            {
                message.MessageVariables = new List<MessageVariableDTO>();
            }
            message.MessageVariables.Add(new MessageVariableDTO { Key = AgentRouteConstants.MessageVariableName, Value = AgentRouteConstants.Unknown });

            message.Content = "We are sorry, but we could not understand your request. Please try again.";

            yield return message;

            await _conversationHistoryService.SaveMessageAsync(message.ToMessageEntity());
        }
    }
}
