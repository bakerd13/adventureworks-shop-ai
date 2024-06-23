using AdventureWorks.Shop.AI.DTOs.Conversations;
using AdventureWorks.Shop.AI.GrainInterfaces;
using AdventureWorks.Shop.AI.ConversationsApi.Apis;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public static class MessagesApi
    {
        public static RouteGroupBuilder MapMessagesApiEndpointsV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/messages").HasApiVersion(1.0);

            api.MapPost("/like", LikeAsync);

            return api;
        }

        public static async Task<Ok> LikeAsync([FromBody] LikeDTO dto, [AsParameters] MessagesServices services)
        {
            var conversation = services.Client.GetGrain<IConversationGrain>(dto.ConversationId);
            await conversation.UpdateLikeAsync(dto.Id, dto.Like);

            return TypedResults.Ok();
        }
    }
}
