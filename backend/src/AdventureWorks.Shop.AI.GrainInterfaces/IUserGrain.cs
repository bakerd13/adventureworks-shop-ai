using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.GrainInterfaces
{
    public interface IUserGrain : IGrainWithStringKey
    {
        Task AddConversationAsync(string conversationId);

        Task DeleteConversationAsync(string conversationId);

        Task<List<Conversation>> GetConversationsAsync();

        Task<User> GetUser();

        Task SetUser(User user);
    }
}
