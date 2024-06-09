using AdventureWorks.Shop.AI.Abstractions.Configuration;
using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.Agents.Services;
using AdventureWorks.Shop.AI.GrainInterfaces;
using Orleans.Runtime;

namespace AdventureWorks.Shop.AI.Grains
{
    public class ConversationGrain : Grain, IConversationGrain
    {
        private readonly IPersistentState<Conversation> _conversation;
        private readonly IConversationSummarize _conversationSummarize;
        private readonly IGrainFactory _grainFactory;

        public ConversationGrain(
        [PersistentState("Conversations", OrleansConfiguration.AdventureWorksStore)]
        IPersistentState<Conversation> conversation,
        IGrainFactory grainFactory,
        IConversationSummarize conversationSummarize)
        {
            _conversation = conversation;
            _grainFactory = grainFactory;
            _conversationSummarize = conversationSummarize;
        }

        public Task<Conversation> GetConversation()
        {
            return Task.FromResult(_conversation.State);
        }

        public Task SetConversation(Conversation conversation)
        {
            if (conversation.Id is null)
            {
                conversation.Id = _conversation.State.Id;
            }

            _conversation.State = conversation;
            return _conversation.WriteStateAsync();
        }

        public async Task<Message> AddMessage(Message message)
        {
            // First message of the conversation so add to user grain and create title for conversataion
            if (_conversation.State.Messages.Count == 0)
            {
                _conversation.State.Messages = new List<Message>();

                // Get the user grain
                var userGrain = _grainFactory.GetGrain<IUserGrain>(message.User?.Id?.ToString());
                if (userGrain != null)
                {
                    await userGrain.AddConversationAsync(_conversation.State.Id);
                }

                var summary = await _conversationSummarize.Summarize(message);
                _conversation.State.Title = summary;
            }

            message.ConversationId = _conversation.State.Id;
            _conversation.State.Messages.Add(message);
            _conversation.State.ModifiedOn = DateTimeOffset.UtcNow;

            await _conversation.WriteStateAsync();

            return await Task.FromResult(message);
        }

        public Task<IList<Message>> GetMessages()
        {
            return Task.FromResult((IList<Message>)_conversation.State.Messages);
        }

        public Task DeleteConversation()
        {
            // TODO remove from User
            return _conversation.ClearStateAsync();
        }

        public override async Task<Task> OnActivateAsync(CancellationToken cancellationToken)
        {
            string primaryKey = this.GetPrimaryKeyString();

            _conversation.State.Id = primaryKey;
            _conversation.State.CreatedOn = DateTimeOffset.UtcNow;
            await _conversation.WriteStateAsync();

            return base.OnActivateAsync(cancellationToken);
        }

        public async Task UpdateLikeAsync(string messageId, bool like)
        {
            // Find the message and update the like
            var message = _conversation.State.Messages.FirstOrDefault(m => m.Id == messageId);
            if (message != null)
            {
                message.Like = like;
            }

            await _conversation.WriteStateAsync();
        }
    }
}
