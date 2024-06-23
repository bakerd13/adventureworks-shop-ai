using Microsoft.AspNetCore.Antiforgery;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public class AntiForgeryServices(
        IAntiforgery antiforgery)
    {
        public IAntiforgery Antiforgery { get; } = antiforgery;
    }
}
