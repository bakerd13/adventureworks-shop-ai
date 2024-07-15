namespace AdventureWorks.Shop.AI.GrainInterfaces
{
    public interface IHealthCheckGrain : IGrainWithStringKey
    {
        Task<bool> IsHealthy();
    }
}
