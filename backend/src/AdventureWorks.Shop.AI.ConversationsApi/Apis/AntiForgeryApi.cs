using Microsoft.AspNetCore.Http.HttpResults;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public static class AntiForgerysApi
    {
        public static RouteGroupBuilder MapAntiForgeryApiEndpointsV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/antiforgery").HasApiVersion(1.0);

            // New endpoint for generating and returning an anti-forgery token
            api.MapGet("token", GetAntiForgeryAsync);
            return api;
        }

        public static Ok<AntiForgeryTokenResponse> GetAntiForgeryAsync(HttpContext httpContext, [AsParameters] AntiForgeryServices services)
        {
            var tokens = services.Antiforgery.GetAndStoreTokens(httpContext);

            if (tokens.RequestToken == null)
            {
                throw new InvalidOperationException("Failed to generate an anti-forgery token.");
            }

            httpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false, Secure = true, SameSite = SameSiteMode.Strict });

            return TypedResults.Ok(new AntiForgeryTokenResponse { Token = tokens.RequestToken });
        }
    }

    public class AntiForgeryTokenResponse
    {
        public string Token { get; set; } = string.Empty;
    }
}
