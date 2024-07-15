using Aspire.Hosting.ApplicationModel;
using HealthChecks.RabbitMQ;

namespace AdventureWorks.Shop.AI.AppHost.Extensions.WaitForDependencies
{
    public static class RabbitMQResourceHealthCheckExtensions
    {
        /// <summary>
        /// Adds a health check to the RabbitMQ server resource.
        /// </summary>
        public static IResourceBuilder<RabbitMQServerResource> WithHealthCheck(this IResourceBuilder<RabbitMQServerResource> builder)
        {
            return builder.WithAnnotation(HealthCheckAnnotation.Create(cs => new RabbitMQHealthCheck(new RabbitMQHealthCheckOptions { ConnectionUri = new(cs) })));
        }
    }
}
