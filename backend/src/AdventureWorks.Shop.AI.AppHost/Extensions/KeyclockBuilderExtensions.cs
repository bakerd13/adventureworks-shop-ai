using AdventureWorks.Shop.AI.AppHost.Resources;

namespace AdventureWorks.Shop.AI.AppHost.Extensions
{
    public static class keycloakBuilderExtensions
    {
        public static IResourceBuilder<KeycloakServerResource> AddKeycloak(this IDistributedApplicationBuilder builder,
            string name,
            IResourceBuilder<ParameterResource> password,
            int port)
        {
            var keyCloak = new KeycloakServerResource(name);
            var keycloak = builder.AddResource(keyCloak)
                                  .WithImage(KeycloakContainerImageTags.Image, KeycloakContainerImageTags.Tag)
                                  .WithImageRegistry(KeycloakContainerImageTags.Registry)
                                  .WithHttpEndpoint(port: 8100, targetPort: 8080)
                                  .WithArgs(["start-dev", "--db", "mssql", "--db-url", $"jdbc:sqlserver://host.docker.internal:{port};databaseName=AdventureWorksKeycloak;TrustServerCertificate=True", "--db-username", "sa", "--db-password", password.Resource.Value])
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["KEYCLOAK_ADMIN"] = "admin";
                                      context.EnvironmentVariables["KEYCLOAK_ADMIN_PASSWORD"] = "admin";
                                  });

            return keycloak;
        }
    }
}
