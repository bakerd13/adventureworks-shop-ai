using AdventureWorks.Shop.AI.AppHost.Extensions;
using AdventureWorks.Shop.AI.AppHost.Extensions.WaitForDependencies;
using AdventureWorks.Shop.AI.AppHost.Helpers;

const int sqlServerPort = 5433;
const string vectorDatabaseEnvironmentVariable = "Services__VectorDatabaseEndpoint";
const string aiProviderTypeEnvironmentVariable = "AIService__Type";
const string aiProviderEndpointEnvironmentVariable = "AIService__Endpoint";
const string aiProviderKeyEnvironmentVariable = "AIService__Key";

// Get the current directory then get the perant so that we can put all the data in there
string bindDatatDirectory = DataVolumeTargetHelper.GetVolumeTarget();

var builder = DistributedApplication.CreateBuilder(args);

var vectorDatabaseEndpoint = builder.Configuration.GetSection("Services").GetSection("VectorDatabaseEndpoint").Value;
var aiProviderType = builder.Configuration.GetSection("AIService").GetSection("Type").Value;
var aiProviderEndpoint = builder.Configuration.GetSection("AIService").GetSection("Endpoint").Value;

var mailpitPort = 1025;

var aiProviderKey = builder.AddParameter("ai-key", secret: true); 
var saPassword = builder.AddParameter("sa-password", secret: true);

var adventureWorksServer = builder.AddSqlServer("adventureWorks-sqlserver", password: saPassword, port: sqlServerPort)
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/config", "/usr/config")
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/backups", "/var/backups")
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/init", "/docker-entrypoint-initdb.d")
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/data", "/var/opt/mssql/data")
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/log", "/var/opt/mssql/log")
    .WithBindMount($"{bindDatatDirectory}/adventureWorks_data/sqlserver/secrets", "/var/opt/mssql/secrets")
    .WithEntrypoint("/usr/config/entrypoint.sh");

var adventureWorksDb = adventureWorksServer.WithHealthCheck().AddDatabase("AdventureWorks2022");
var adventureWorksOrleansDb = adventureWorksServer.WithHealthCheck("SELECT count(1) FROM [AdventureWorksOrleans].[dbo].[OrleansQuery]").AddDatabase("AdventureWorksOrleans");
var adventureWorksKeycloak = adventureWorksServer.WithHealthCheck().AddDatabase("AdventureWorksKeycloak");

var redis = builder.AddRedis("redis")
    .WithRedisCommander();

var rabbitMq = builder.AddRabbitMQ("rabbitmq")
    .WithManagementPlugin()
    .WithExternalHttpEndpoints();

var mailpit = builder.AddMailpit("mailpit", mailpitPort, $"{bindDatatDirectory}/adventureWorks_data/mailpit");

var storage = builder.AddAzureStorage("storage")
    .RunAsEmulator(emulator => emulator.WithDataBindMount($"{bindDatatDirectory}/adventureWorks_data/azure_storage"));

var blobs = storage.AddBlobs("BlobStorage");

var neo4j = builder.AddNeo4j("neo4j", saPassword, $"{bindDatatDirectory}/adventureWorks_data/neo4j");

// Due to limitations in the current implementation of the WaitFor method, we need to create a separate database checker project
// This is because on machine limitations and the startup of docker sqlserver mounting the databases can take a while,
// so we need to wait for the databases to be ready before starting the other services that rely on them, such as the orleans silo.
var databaseChecker = builder.AddProject<Projects.DockerDatabaseChecker>("adventureworks-shop-ai-databasechecker")
    .WithReference(adventureWorksOrleansDb);

var keycloak = builder.AddKeycloak("keycloak", saPassword, sqlServerPort)
    .WaitFor(adventureWorksKeycloak)
    .WaitForCompletion(databaseChecker);

var silo = builder.AddProject<Projects.AdventureWorks_Shop_AI_Silo>("adventureworks-shop-ai-silo")
    .WithReference(adventureWorksOrleansDb)
    .WithEnvironment(aiProviderTypeEnvironmentVariable, aiProviderType)
    .WithEnvironment(aiProviderEndpointEnvironmentVariable, aiProviderEndpoint)
    .WithEnvironment(aiProviderKeyEnvironmentVariable, aiProviderKey)
    .WithEnvironment("Email__host", "localhost")
    .WithEnvironment("Email__port", mailpitPort.ToString())
    .WaitFor(adventureWorksOrleansDb)
    .WaitForCompletion(databaseChecker);

var apiService = builder.AddProject<Projects.AdventureWorks_Shop_AI_ConversationsApi>("adventureworks-shop-ai-conversationsapi")
    .WithReference(redis)
    .WithReference(adventureWorksDb)
    .WithReference(adventureWorksOrleansDb)
    .WithEnvironment(vectorDatabaseEnvironmentVariable, vectorDatabaseEndpoint)
    .WithEnvironment(aiProviderTypeEnvironmentVariable, aiProviderType)
    .WithEnvironment(aiProviderEndpointEnvironmentVariable, aiProviderEndpoint)
    .WithEnvironment(aiProviderKeyEnvironmentVariable, aiProviderKey)
    .WaitFor(adventureWorksDb)
    .WaitFor(redis)
    .WaitFor(silo)
    .WaitForCompletion(databaseChecker);

builder.AddProject<Projects.AdventureWorks_Shop_AI_BackOfficeApi>("adventureworks-shop-ai-backofficeapi")
    .WithReference(blobs)
    .WithReference(adventureWorksDb)
    .WithEnvironment(vectorDatabaseEnvironmentVariable, vectorDatabaseEndpoint)
    .WithEnvironment(aiProviderTypeEnvironmentVariable, aiProviderType)
    .WithEnvironment(aiProviderEndpointEnvironmentVariable, aiProviderEndpoint)
    .WithEnvironment(aiProviderKeyEnvironmentVariable, aiProviderKey)
    .WaitForCompletion(databaseChecker);

builder.Build().Run();
