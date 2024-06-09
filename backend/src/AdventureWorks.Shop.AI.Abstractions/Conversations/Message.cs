using AdventureWorks.Shop.AI.Abstractions.Enums;
using Orleans;

namespace AdventureWorks.Shop.AI.Abstractions.Conversations
{
    [GenerateSerializer]
    public class Message
    {
        [Id(0)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Id(1)]
        public MessageType? MessageType { get; set; }

        [Id(2)]
        public string Content { get; set; } = string.Empty;

        [Id(3)]
        public DateTime CreatedAt { get; set; }

        [Id(4)]
        public string ConversationId { get; set; } = Guid.NewGuid().ToString();

        [Id(5)]
        public User User { get; set; } = new User();

        [Id(6)]
        public IList<MessageVariable>? MessageVariables { get; set; }

        [Id(7)]
        public bool? Like { get; set; }
    }
}
