using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.Agents.Extensions;
using AdventureWorks.Shop.AI.ServiceDefaults;
using AdventureWorks.Shop.AI.ConversationsApi.Apis;
using Asp.Versioning;
using AdventureWorks.Shop.AI.Abstractions.Configuration;

var AdventureWorksAllowSpecificOrigins = "_adventureWorksAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.AddRedisClient(ApplicationResourceNames.AdventureWorksRedisCacheName);

builder.Host.UseOrleansClient(clientBuilder =>
{
    // To many errors for db clustering trying localhost clustering
    //clientBuilder.Configure<ClusterOptions>(options =>
    // {
    //     options.ClusterId = OrleansConfiguration.ClusterId;
    //     options.ServiceId = OrleansConfiguration.ServiceId;
    // });

    // clientBuilder.UseAdoNetClustering(options =>
    // {
    //     options.ConnectionString = connectionString;
    //     options.Invariant = invariant;
    // });

    clientBuilder.UseLocalhostClustering();
});

// Add service defaults & Aspire components.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();
builder.Host.AddConfiguration();

var withApiVersioning = builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = ApiVersionReader.Combine(new QueryStringApiVersionReader(), new HeaderApiVersionReader("X-Api-Version"));
});

builder.AddDefaultOpenApi(withApiVersioning);

builder.Services
       .AddSingleton<ILogger>(sp => sp.GetRequiredService<ILogger<Program>>())
       .AddOptions(builder.Configuration)
       .AddAgentServices();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AdventureWorksAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapDefaultEndpoints();

var conversations = app.NewVersionedApi("Conversations");
conversations.MapConversationsApiV1();

var messages = app.NewVersionedApi("Messages");
messages.MapMessagesApiV1();

var users = app.NewVersionedApi("Users");
users.MapUsersApiV1();

app.UseDefaultOpenApi();

app.UseCors(AdventureWorksAllowSpecificOrigins);

app.Run();

