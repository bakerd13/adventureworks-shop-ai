using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Agents.Plugins;
using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Agents.Services
{
  public class ConversationSummarize : IConversationSummarize
  {
    private readonly AIServiceOptions _aiOptions;
    private readonly Kernel _kernel;
    private readonly OpenAIPromptExecutionSettings _settings;
    private readonly KernelPlugin conversationSummaryPlugin;

    public ConversationSummarize(IOptions<AIServiceOptions> aiOptions)
    {
      _aiOptions = aiOptions.Value;

      _settings = new()
      {
        ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
        MaxTokens = 1000,
        Temperature = 0.1
      };

      // Create a kernel with OpenAI chat completion
      IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

      kernelBuilder.AddOpenAIChatCompletion(
              modelId: AIModels.GPT_4_Turbo,
              apiKey: _aiOptions.Key);

      _kernel = kernelBuilder.Build();

      conversationSummaryPlugin = _kernel.ImportPluginFromType<ConversationSummaryPlugin>();
    }

    public async Task<string?> Summarize(Conversation conversation)
    {
      var conversationItems = conversation.Messages.Select(s => $"{s.User.Name}: {s.Content}");
      var conversationTranscript = string.Join(Environment.NewLine, conversationItems);

      try
      {
        FunctionResult summary = await _kernel.InvokeAsync(
            conversationSummaryPlugin["SummarizeConversation"], new() { ["input"] = conversationTranscript });

        return summary.GetValue<string>();
      }
      catch (Exception ex)
      {
        throw new Exception("Failed to summarize", ex);
      }
    }

        public async Task<string?> Summarize(Message message)
        {
            try
            {
                FunctionResult summary = await _kernel.InvokeAsync(
                    conversationSummaryPlugin["SummarizeConversation"], new() { ["input"] = message.Content });

                return summary.GetValue<string>();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to summarize", ex);
            }
        }
    }
}
