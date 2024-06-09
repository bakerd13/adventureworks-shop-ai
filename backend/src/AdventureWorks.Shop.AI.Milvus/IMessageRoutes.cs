using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Milvus
{
    public interface IMessageRoutes
    {
        Task<string?> MessageRoute(Message ask);
    }
}
