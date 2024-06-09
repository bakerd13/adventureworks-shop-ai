using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Agents.Prompts;
using AdventureWorks.Shop.AI.Agents.Routers;
using AdventureWorks.Shop.AI.Agents.Services;
using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Enums;

namespace AdventureWorks.Shop.AI.Agents
{
    public class SafetyAgent : IAgent
    {
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;
        private readonly IConversationHistoryService _conversationHistoryService;

        public SafetyAgent(IOptions<AIServiceOptions> aiOptions, IConversationHistoryService conversationHistoryService)
        {
            _aiOptions = aiOptions.Value;
            _conversationHistoryService = conversationHistoryService;

            _settings = new()
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
                MaxTokens = 500,
                Temperature = 0.7
            };

            // Create a kernel with OpenAI chat completion
            IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

            kernelBuilder.AddOpenAIChatCompletion(
                    modelId: AIModels.GPT_4_Turbo,
                    apiKey: _aiOptions.Key);

            _kernel = kernelBuilder.Build();
        }
        public async IAsyncEnumerable<MessageDTO> Ask(Message ask)
        {
            var message = ask.ToAgentMessageDTO();
            message.MessageType = MessageType.Message;

            if (message.MessageVariables is null)
            {
                message.MessageVariables = [];
            }

            // Output the result
            if (message.MessageVariables.FirstOrDefault(pair => pair?.Key == AgentRouteConstants.MessageVariableName) is null)
            {
                message.MessageVariables.Add(new MessageVariableDTO { Key = AgentRouteConstants.MessageVariableName, Value = AgentRouteConstants.Safety });
            }

            KernelArguments arguments = new(_settings);
            arguments.Add("userMessage", message.Content);

            var prompt = AgentPrompts.SafetyPrompt;

            await foreach (var update in _kernel.InvokePromptStreamingAsync(prompt, arguments))
            {
                message.Content += update.ToString();
                yield return message;
            }

            await _conversationHistoryService.SaveMessageAsync(message.ToMessageEntity());
        }
    }
}
