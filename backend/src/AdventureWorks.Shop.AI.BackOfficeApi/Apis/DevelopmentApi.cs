using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.GrainInterfaces;
using Microsoft.AspNetCore.Http.HttpResults;

namespace AdventureWorks.Shop.AI.BackOfficeApi.Apis
{
    public static class DevelopmentApi
    {
        public static RouteGroupBuilder MapDevelopmentApiV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/development").HasApiVersion(1.0);

            api.MapPost("/create-agent-route-collection", SeedAgentRoutesAsync);
            api.MapDelete("/delete-agent-route-collection", DeleteAgentRoutesAsync);

            return api;
        }

        public static async Task<Ok> SeedAgentRoutesAsync([AsParameters] DevelopmentServices services)
        {
            await services.AgentRoutesCollection.SeedAgentRoutesAsync();

            return TypedResults.Ok();
        }

        public static async Task<Ok> DeleteAgentRoutesAsync([AsParameters] DevelopmentServices services)
        {
            await services.AgentRoutesCollection.DeleteAgentRoutesAsync();

            return TypedResults.Ok();
        }
    }
}
