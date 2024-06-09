using AdventureWorks.Shop.AI.Core.Options;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
    public static class ConfigExtensions
    {
        /// <summary>
        /// Build the configuration for the service.
        /// </summary>
        internal static IHostBuilder AddConfiguration(this IHostBuilder host)
        {
            string? environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            host.ConfigureAppConfiguration((builderContext, configBuilder) =>
            {
                configBuilder.AddJsonFile(
                    path: "appsettings.json",
                    optional: false,
                    reloadOnChange: true);

                configBuilder.AddJsonFile(
                    path: $"appsettings.{environment}.json",
                    optional: true,
                    reloadOnChange: true);

                configBuilder.AddEnvironmentVariables();

                configBuilder.AddUserSecrets(
                    assembly: Assembly.GetExecutingAssembly(),
                    optional: true,
                    reloadOnChange: true);
            });
            return host;
        }

        internal static IServiceCollection AddOptions(this IServiceCollection services, ConfigurationManager configuration)
        {
            // General configuration
            services.AddOptions<ServicesOptions>()
                .Bind(configuration.GetSection(ServicesOptions.PropertyName))
                .ValidateDataAnnotations()
                .ValidateOnStart()
                .PostConfigure(TrimStringProperties);
            
            // Default AI service configurations for Semantic Kernel
            services.AddOptions<AIServiceOptions>()
                .Bind(configuration.GetSection(AIServiceOptions.PropertyName))
                .ValidateDataAnnotations()
                .ValidateOnStart()
                .PostConfigure(TrimStringProperties);

            return services;
        }

        /// <summary>
        /// Trim all string properties, recursively.
        /// </summary>
        private static void TrimStringProperties<T>(T options) where T : class
        {
            Queue<object> targets = new();
            targets.Enqueue(options);

            while (targets.Count > 0)
            {
                object target = targets.Dequeue();
                Type targetType = target.GetType();
                foreach (PropertyInfo property in targetType.GetProperties())
                {
                    // Skip enumerations
                    if (property.PropertyType.IsEnum)
                    {
                        continue;
                    }

                    // Property is a built-in type, readable, and writable.
                    if (property.PropertyType.Namespace == "System" &&
                        property.CanRead &&
                        property.CanWrite)
                    {
                        // Property is a non-null string.
                        if (property.PropertyType == typeof(string) &&
                            property.GetValue(target) != null)
                        {
                            property.SetValue(target, property.GetValue(target)!.ToString()!.Trim());
                        }
                    }
                    else
                    {
                        // Property is a non-built-in and non-enum type - queue it for processing.
                        if (property.GetValue(target) != null)
                        {
                            targets.Enqueue(property.GetValue(target)!);
                        }
                    }
                }
            }
        }
    }
}
