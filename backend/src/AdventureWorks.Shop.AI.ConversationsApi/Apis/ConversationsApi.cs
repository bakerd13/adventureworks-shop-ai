using AdventureWorks.Shop.AI.Core.Extensions;
using AdventureWorks.Shop.AI.DTOs.Conversations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public static class ConversationsApi
    {
        public static RouteGroupBuilder MapConversationsApiV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/conversations").HasApiVersion(1.0);

            api.MapPost("/converse", ConverseStreamAsync);
            api.MapGet("conversation/{conversationId}", GetConversationAsync);
            api.MapDelete("{conversationId}", DeleteConversationAsync);
            
            api.MapGet("{userId}", GetUserConversationsAsync);
            
            return api;
        }

        public static async IAsyncEnumerable<MessageDTO> ConverseStreamAsync(MessageDTO dto, [AsParameters] ConversationsServices services)
        {
            var message = await services.ConversationHistory.SaveMessageAsync(dto.ToMessageEntity());
            var agent = await services.AgentRouter.Query(message);

            // Start processing messages asynchronously as they arrive
            await foreach (var result in agent.Ask(message))
            {
                yield return result;
            }
        }

        public static async Task<Results<Ok<ConversationDTO>, NotFound>> GetConversationAsync(string conversationId, [AsParameters] ConversationsServices services)
        {
            var conversation = await services.ConversationHistory.GetConversationAsync(conversationId);

            if (conversation == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(conversation.ToConversationDTO());
        }

        [HttpDelete("{conversationId}")]
        public static async Task<Ok> DeleteConversationAsync(string conversationId, [AsParameters] ConversationsServices services)
        {
            await services.ConversationHistory.DeleteConversationAsync(conversationId);

            return TypedResults.Ok();
        }

        public static async Task<Results<Ok<IEnumerable<ConversationListDTO>>, NotFound>> GetUserConversationsAsync(string userId, [AsParameters] ConversationsServices services)
        {
            var conversations = await services.ConversationHistory.GetUserConversationsAsync(userId);

            if (conversations == null)
            {
                return TypedResults.NotFound();
            }
            var conversationList = conversations.ToConversationListDTO();

            return TypedResults.Ok(conversationList);
        }
    }
}
