using Orleans;

namespace AdventureWorks.Shop.AI.Abstractions.Conversations
{
    [GenerateSerializer]
    public class User
    {
        [Id(0)]
        public string Id { get; set; } = new Guid().ToString();

        [Id(1)]
        public string Name { get; set; } = string.Empty;

        [Id(2)]
        public string? Avatar { get; set; }

        [Id(3)]
        public string Email { get; set; } = "undeliverable@adventureworks.ai.com";
    }
}
