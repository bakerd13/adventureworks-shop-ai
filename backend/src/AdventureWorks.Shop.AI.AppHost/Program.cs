using AdventureWorks.Shop.AI.AppHost.Extensions;

var builder = DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("redis")
    .WithRedisCommander();

var rabbitMq = builder.AddRabbitMQ("eventbus")
    // .WithDataVolume("eventbus_data") // commented ou until I discover using this disallows login
    .WithManagementPlugin()
    .WithExternalHttpEndpoints();

// ISSUE milvusEtcd, milvusMinio and milvusStandalone failing with docker permissions. This may be due to corporate infrastructure
// so use docker compose instead.
// var milvusEtcd = builder.AddMilvusEtcd("milvusetcd", "c:/milvus/volumes/etcd");
// var milvusMinio = builder.AddMilvusMinio("milvusminio", "c:/milvus/volumes/minio");
// var milvusStandalone = builder.AddMilvusStandalone("milvusstandalone", "c:/milvus/volumes/milvus");
// var milvusAttu = builder.AddMilvusAttu("attu", 8090);

var mailpit = builder.AddMailpit("mailpit", "c:/mailpit");

var apiService = builder.AddProject<Projects.AdventureWorks_Shop_AI_ConversationsApi>("adventureworks-shop-ai-conversationsapi");

builder.AddProject<Projects.AdventureWorks_Shop_AI_BackOfficeApi>("adventureworks-shop-ai-backofficeapi");

builder.AddProject<Projects.AdventureWorks_Shop_AI_Silo>("adventureworks-shop-ai-silo");

builder.Build().Run();
