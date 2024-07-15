using AdventureWorks.Shop.AI.AppHost.Resources;

namespace AdventureWorks.Shop.AI.AppHost.Extensions
{
    public static class Neo4jBuilderExtensions
    {
        public static IResourceBuilder<Neo4jServerResource> AddNeo4j(this IDistributedApplicationBuilder builder,
            string name,
            IResourceBuilder<ParameterResource> password,
            string volume)
        {
            var neo4jResource = new Neo4jServerResource(name);
            var neo4j = builder.AddResource(neo4jResource)
                                  .WithImage(Neo4jContainerImageTags.Image, Neo4jContainerImageTags.Tag)
                                  .WithImageRegistry(Neo4jContainerImageTags.Registry)
                                  .WithBindMount(volume, "/data")
                                  .WithHttpEndpoint(port: 7474, targetPort: 7474)
                                  .WithEndpoint(port: 7687, targetPort: 7687)
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["NEO4J_AUTH"] = $"neo4j/{password.Resource.Value}";
                                  });

            return neo4j;
        }
    }
}
