using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.Agents.Extensions;
using AdventureWorks.Shop.AI.ServiceDefaults;
using AdventureWorks.Shop.AI.ConversationsApi.Apis;
using Asp.Versioning;
using AdventureWorks.Shop.AI.Abstractions.Configuration;
using AdventureWorks.Shop.AI.ConversationsApi.Extensions;
using Microsoft.AspNetCore.Antiforgery;

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
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN"; // Set a custom header name for sending the token.
});

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
       .AddAgentServices()
       .AddKernels(builder.Configuration);

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

app.UseAntiforgery();

// Configure Antiforgery Middleware with more control
//app.Use((context, next) =>
//{
//    var path = context.Request.Path.Value;

//    // Assuming "/api/speech/speech-to-text" is the problematic endpoint
//    if (path is not null && !path.StartsWith("/api/speech/speech-to-text"))
//    {
//        var antiforgery = context.RequestServices.GetService<IAntiforgery>();
//        // Assuming you have a way to determine if the request should be validated
//        if (antiforgery != null && context.Request.Path.StartsWithSegments("/api"))
//        {
//            var tokens = antiforgery?.GetAndStoreTokens(context);
//            context.Response.Cookies.Append("X-XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
//        }
//    }

//    return next(context);
//});

app.MapDefaultEndpoints();

var antiforgery = app.NewVersionedApi("antiforgery");
antiforgery.MapAntiForgeryApiEndpointsV1();

var conversations = app.NewVersionedApi("Conversations");
conversations.MapConversationsApiEndpointsV1();

var messages = app.NewVersionedApi("Messages");
messages.MapMessagesApiEndpointsV1();

var users = app.NewVersionedApi("Users");
users.MapUsersApiEndpointsV1();

var speech = app.NewVersionedApi("speech");
speech.MapSpeechApiEndpointsV1();

app.UseDefaultOpenApi();

app.UseCors(AdventureWorksAllowSpecificOrigins);

app.Run();

