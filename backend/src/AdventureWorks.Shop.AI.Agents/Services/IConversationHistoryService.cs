using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Agents.Services
{
    public interface IConversationHistoryService
    {
        Task<Message> SaveMessageAsync(Message message);

        Task<IEnumerable<Conversation>?> GetUserConversationsAsync(string userId);

        Task<Conversation> GetConversationAsync(string conversationId);

        Task DeleteConversationAsync(string conversationId);
    }
}
