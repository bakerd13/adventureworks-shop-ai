using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.GrainInterfaces;
using AdventureWorks.Shop.AI.ConversationsApi.Apis;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public static class UsersApi
    {
        public static RouteGroupBuilder MapUsersApiV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/users").HasApiVersion(1.0);

            api.MapGet("{id}", GetUserAsync);
            api.MapPost("/set", SetUserAsync);

            return api;
        }

        public static async Task<Ok<UserDTO>> GetUserAsync(string id, [AsParameters] UsersServices services)
        {
            var user = services.Client.GetGrain<IUserGrain>(id);
            var result = await user.GetUser();

            return TypedResults.Ok(result.ToUserDTO());
        }

        public static async Task<Ok> SetUserAsync([FromBody] UserDTO dto, [AsParameters] UsersServices services)
        {
            var user = services.Client.GetGrain<IUserGrain>(dto.Id);
            await user.SetUser(dto.ToUserEntity());

            return TypedResults.Ok();
        }
    }
}
