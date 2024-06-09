namespace AdventureWorks.Shop.AI.Milvus
{
    public interface IAgentRoutesCollection
    {
        Task DeleteAgentRoutesAsync();

        Task<bool> SeedAgentRoutesAsync();
    }
}
