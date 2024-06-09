namespace AdventureWorks.Shop.AI.Milvus
{
    public class AgentRouteData
    {
        public string Route { get; set; } = string.Empty;

        public List<string> Questions { get; set; } = new List<string>();
    }

    public class AgentRouteRootData
    {
        public List<AgentRouteData> Routes { get; set; } = new List<AgentRouteData>();
    }
}
