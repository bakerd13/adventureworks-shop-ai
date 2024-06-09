using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Agents.Services
{
    public interface IConversationSummarize
    {
        Task<string?> Summarize(Conversation conversation);

        Task<string?> Summarize(Message message);
    }
}
