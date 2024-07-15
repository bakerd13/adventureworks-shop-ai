using Asp.Versioning;
using AdventureWorks.Shop.AI.Abstractions.Configuration;
using AdventureWorks.Shop.AI.BackOfficeApi.Apis;
using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.Milvus;
using AdventureWorks.Shop.AI.ServiceDefaults;

IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults();
builder.AddAzureBlobClient(ApplicationResourceNames.AdventureWorksBlobStorageConnectionName);

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
       .AddOptions(builder.Configuration);

builder.Services.AddScoped<IAgentRoutesCollection, AgentRoutesCollection>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.MapDefaultEndpoints();

var development = app.NewVersionedApi("Development");

development.MapDevelopmentApiV1();

app.UseDefaultOpenApi();

app.Run();
