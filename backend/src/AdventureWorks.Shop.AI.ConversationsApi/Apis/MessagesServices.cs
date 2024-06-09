namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public class MessagesServices(
        IClusterClient client,
        ILogger<MessagesServices> logger)
    {
        public IClusterClient Client { get; } = client;

        public ILogger<MessagesServices> Logger { get; } = logger;
    }
}
