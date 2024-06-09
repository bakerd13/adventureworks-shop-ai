using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
    public static class ToConversationEntities
    {
        public static Message ToMessageEntity(this MessageDTO message)
        {
            var messageVariables = new List<MessageVariable>();

            if (message.MessageVariables is not null)
            {
                foreach (var messageVariable in message.MessageVariables)
                {
                    messageVariables.Add(new MessageVariable { Key = messageVariable.Key, Value = messageVariable.Value });
                }
            }

            if (message.ConversationId is null || message.ConversationId == Guid.Empty.ToString())
            {
                message.ConversationId = Guid.NewGuid().ToString();
            }

            return new Message
            {
                Id = message.Id,
                MessageType = message.MessageType,
                Content = message.Content,
                CreatedAt = DateTime.UtcNow,
                User = new User { Id = message.User.Id, Name = message.User.Name, Avatar = message.User.Avatar },
                ConversationId = message.ConversationId,
                MessageVariables = messageVariables,
                Like = message.Like,
            };
        }
    }
}
