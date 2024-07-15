using AdventureWorks.Shop.AI.Milvus;

namespace AdventureWorks.Shop.AI.BackOfficeApi.Apis
{
    public class DevelopmentServices(IAgentRoutesCollection agentRoutesCollection, ILogger<DevelopmentServices> logger)
    {
        public IAgentRoutesCollection AgentRoutesCollection { get; } = agentRoutesCollection;

        public ILogger<DevelopmentServices> Logger { get; } = logger;
    }
}
