using AdventureWorks.Shop.AI.Abstractions.Configuration;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

IConfiguration configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .Build();

string? connectionString = configuration.GetConnectionString(OrleansConfiguration.ConnectionStringName);

if (string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine($"Connection string '{OrleansConfiguration.ConnectionStringName}' not found.");
}
else
{
    Console.WriteLine($"Connection string '{OrleansConfiguration.ConnectionStringName}': {connectionString}");
}

// Retry logic for database connection
bool isConnected = false;
int retryCount = 0;
int maxRetries = 60; // Retry for up to 5 minutes (60 retries with 5 seconds delay)
TimeSpan delay = TimeSpan.FromSeconds(5);

while (!isConnected && retryCount < maxRetries)
{
    try
    {
        using (var connection = new SqlConnection(connectionString))
        {
            await connection.OpenAsync();
            isConnected = true;
            Console.WriteLine("Successfully connected to the database.");
        }
    }
    catch
    {
        retryCount++;
        Console.WriteLine($"Failed to connect to the database. Attempt {retryCount} of {maxRetries}. Retrying in {delay.TotalSeconds} seconds...");
        await Task.Delay(delay);
    }
}

if (!isConnected)
{
    throw new Exception("Unable to connect to the database after multiple attempts.");
}
