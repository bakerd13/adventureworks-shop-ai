using AdventureWorks.Shop.AI.AppHost.Resources;

namespace AdventureWorks.Shop.AI.AppHost.Extensions
{
    public static class MailpitBuilderExtensions
    {
        public static IResourceBuilder<MailpitServerResource> AddMailpit(this IDistributedApplicationBuilder builder,
            string name,
            string volume)
        {
            var mailPit = new MailpitServerResource(name);
            var mailpit = builder.AddResource(mailPit)
                                  .WithImage("axllent/mailpit")
                                  .WithBindMount(volume, "/data")
                                  .WithHttpEndpoint(port: 8025, targetPort: 8025)
                                  .WithEndpoint(port: 1025, targetPort: 1025)
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["MP_DATABASE"] = "/data/mailpit.db";
                                  });

            return mailpit;
        }
    }
}
