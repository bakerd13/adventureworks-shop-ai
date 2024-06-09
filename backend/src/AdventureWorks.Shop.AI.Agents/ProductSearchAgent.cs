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

namespace AdventureWorks.Shop.AI.Agents
{
    public class ProductSearchAgent : IAgent
    {
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;
        private readonly IConversationHistoryService _conversationHistoryService;

        public ProductSearchAgent(IOptions<AIServiceOptions> aiOptions, IConversationHistoryService conversationHistoryService)
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

            // Simulating some asynchronous operation, you can replace this with actual async operations
            await Task.Delay(100);

            await _conversationHistoryService.SaveMessageAsync(message.ToMessageEntity());

            yield return message;
        }
    }
}
