using Orleans;

namespace AdventureWorks.Shop.AI.Abstractions.Conversations
{
    [GenerateSerializer]
    public class MessageVariable
    {
        [Id(0)]
        public string? Id { get; set; }

        [Id(1)]
        public string? MessageId { get; set; }

        [Id(2)]
        public string Key { get; set; } = string.Empty;

        [Id(3)]
        public string Value { get; set; } = string.Empty;
    }
}
