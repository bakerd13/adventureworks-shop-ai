using AdventureWorks.Shop.AI.Abstractions.Configuration;
using AdventureWorks.Shop.AI.Agents.Services;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Core.Services;
using AdventureWorks.Shop.AI.Silo.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

try
{
    IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

    string? connectionString = configuration.GetConnectionString(OrleansConfiguration.ConnectionStringName);

    if (string.IsNullOrEmpty(connectionString))
    {
        Console.WriteLine($"Connection string '{OrleansConfiguration.ConnectionStringName}' not found.");
        return 1;
    }
    else
    {
        Console.WriteLine($"Connection string '{OrleansConfiguration.ConnectionStringName}': {connectionString}");
    }

    const string invariant = "System.Data.SqlClient";

    var silo = new HostBuilder()
        .UseOrleans(builder =>
        {
            // To many errors for db clustering trying localhost clustering
            //builder.Configure<ClusterOptions>(options =>
            // {
            //     options.ClusterId = OrleansConfiguration.ClusterId;
            //     options.ServiceId = OrleansConfiguration.ServiceId;
            // });

            //builder.UseAdoNetClustering(options =>
            //{
            //    options.ConnectionString = connectionString;
            //    options.Invariant = invariant;
            //});

            builder.UseLocalhostClustering();

            // Use ADO.NET for reminder service
            builder.UseAdoNetReminderService(options =>
            {
                options.ConnectionString = connectionString;
                options.Invariant = invariant;
            });

            builder.AddAdoNetGrainStorage(OrleansConfiguration.AdventureWorksStore, options =>
            {
                options.ConnectionString = connectionString;
                options.Invariant = invariant;
            });

            // builder.ConfigureEndpoints(siloPort: 11111, gatewayPort: 30000);
            builder.UseDashboard();
        })
        .ConfigureServices((context, services) =>
        {
            services.AddSingleton<IConversationSummarize, ConversationSummarize>();
            services.AddOptions<AIServiceOptions>()
                .Bind(configuration.GetSection(AIServiceOptions.PropertyName))
                .ValidateDataAnnotations()
                .ValidateOnStart();
            services.AddOptions<EmailOptions>()
                .Bind(configuration.GetSection(EmailOptions.PropertyName))
                .ValidateDataAnnotations()
                .ValidateOnStart();
            services.AddSingleton<IEmailSender, EmailSender>();
        })
        .UseConsoleLifetime()
        .AddConfiguration()
        .Build();

    await silo.RunAsync();
    return 0;
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex);
    return 1;
}
