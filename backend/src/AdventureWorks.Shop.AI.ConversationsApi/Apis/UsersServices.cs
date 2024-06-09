namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public class UsersServices(
        IClusterClient client,
        ILogger<UsersServices> logger)
    {
        public IClusterClient Client { get; } = client;

        public ILogger<UsersServices> Logger { get; } = logger;
    }
}
