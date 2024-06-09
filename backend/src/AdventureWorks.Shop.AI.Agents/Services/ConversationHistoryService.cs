using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.GrainInterfaces;

namespace AdventureWorks.Shop.AI.Agents.Services
{
    public class ConversationHistoryService : IConversationHistoryService
    {
        private readonly IClusterClient _client;

        public ConversationHistoryService(IClusterClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Save a new message to the chat history.
        /// </summary>
        /// <param name="message">The message</param>
        public async Task<Message> SaveMessageAsync(Message message)
        {
            if (message == null) throw new ArgumentNullException(nameof(message));

            IConversationGrain conversationGrain = _client.GetGrain<IConversationGrain>(message.ConversationId);
            var conversation = await conversationGrain.GetConversation();
            message.ConversationId = conversation.Id;
            return await conversationGrain.AddMessage(message);
        }

        /// <summary>
        /// get conversations history for user.
        /// </summary>
        /// <param name="userId">The chat ID</param>
        /// <returns>The a list of conversations.</returns>
        public async Task<IEnumerable<Conversation>?> GetUserConversationsAsync(string userId)
        {
            IUserGrain user = _client.GetGrain<IUserGrain>(userId);
            return await user.GetConversationsAsync();
        }

        /// <summary>
        /// get conversations history for user.
        /// </summary>
        /// <param name="userId">The chat ID</param>
        /// <returns>The a list of conversations.</returns>
        public Task<Conversation> GetConversationAsync(string conversationId)
        {
            IConversationGrain conversationGrain = _client.GetGrain<IConversationGrain>(conversationId);

            return conversationGrain.GetConversation();
        }

        public Task DeleteConversationAsync(string conversationId)
        {
            IConversationGrain conversationGrain = _client.GetGrain<IConversationGrain>(conversationId);

            return conversationGrain.DeleteConversation();
        }
    }
}
