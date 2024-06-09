using Orleans;

namespace AdventureWorks.Shop.AI.Abstractions.Conversations
{
    [GenerateSerializer]
    public class Conversation
    {
        /// <summary>
        /// Conversation ID that is persistent and unique.
        /// </summary>
        [Id(0)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// Title of the conversation.
        /// </summary>
        [Id(1)]
        public string? Title { get; set; }

        /// <summary>
        /// Timestamp of the conversation creation.
        /// </summary>
        [Id(2)]
        public DateTimeOffset CreatedOn { get; set; }

        /// <summary>
        /// Timestamp of the conversation creation.
        /// </summary>
        [Id(3)]
        public DateTimeOffset ModifiedOn { get; set; }

        /// <summary>
        /// Mesages related to the conversation.
        /// </summary>
        [Id(4)]
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
