using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.Abstractions.Enums;
using AdventureWorks.Shop.AI.DTOs.Conversations;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
    public static class ToConversationDTOs
    {
        public static MessageDTO ToAgentMessageDTO(this Message message)
        {
            var messageVariables = new List<MessageVariableDTO>();

            if (message.MessageVariables is not null)
            {
                foreach (var messageVariable in message.MessageVariables)
                {
                    messageVariables.Add(new MessageVariableDTO { Key = messageVariable.Key, Value = messageVariable.Value });
                }
            }
            return new MessageDTO
            {
                Id = Guid.NewGuid().ToString(),
                MessageType = message.MessageType,
                Content = string.Empty,
                CreatedAt = DateTime.UtcNow,
                User = new UserDTO { Id = AuthorRoles.Assistant.ToString() },
                ConversationId = message.ConversationId,
                MessageVariables = message.MessageVariables is null ? new List<MessageVariableDTO>() : messageVariables,
                Like = message.Like,
            };
        }

        public static IEnumerable<ConversationListDTO> ToConversationListDTO(this IEnumerable<Conversation> conversations)
        {
            var conversationDTO = new List<ConversationListDTO>();

            foreach (var conversation in conversations)
            {
                conversationDTO.Add(new ConversationListDTO
                {
                    Id = conversation.Id,
                    Title = conversation.Title,
                    CreatedOn = conversation.CreatedOn,
                    ModifiedOn = conversation.ModifiedOn,
                });
            }

            return conversationDTO;
        }

        public static IEnumerable<MessageDTO> ToMessagesDTO(this IEnumerable<Message> messages)
        {
            var messagesDTO = new List<MessageDTO>();

            foreach (var message in messages)
            {
                var messageVariables = new List<MessageVariableDTO>();

                if (message.MessageVariables is not null)
                {
                    foreach (var messageVariable in message.MessageVariables)
                    {
                        messageVariables.Add(new MessageVariableDTO { Key = messageVariable.Key, Value = messageVariable.Value });
                    }
                }

                messagesDTO.Add(new MessageDTO
                {
                    Id = message.Id,
                    MessageType = message.MessageType,
                    Content = message.Content,
                    CreatedAt = message.CreatedAt,
                    User = new UserDTO { Id = message.User.Id, Name = message.User.Name, Avatar = message.User.Avatar },
                    ConversationId = message.ConversationId,
                    MessageVariables = messageVariables,
                    Like = message.Like,
                });

            }

            return messagesDTO;
        }

        public static ConversationDTO ToConversationDTO(this Conversation conversation)
        {
            var conversationDTO = new ConversationDTO
            {
                Id = conversation.Id,
                Title = conversation.Title,
                CreatedOn = conversation.CreatedOn,
                ModifiedOn = conversation.ModifiedOn,
                Messages = conversation.Messages.ToMessagesDTO(),
            };

            return conversationDTO;
        }
    }
}
