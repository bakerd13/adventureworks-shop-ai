using AdventureWorks.Shop.AI.Agents.Routers;
using AdventureWorks.Shop.AI.Agents.Services;
using AdventureWorks.Shop.AI.Milvus;
using Microsoft.Extensions.DependencyInjection;

namespace AdventureWorks.Shop.AI.Agents.Extensions
{
    public static class AgentServiceExtensions
    {
        public static IServiceCollection AddAgentServices(this IServiceCollection services)
        {
            services.AddSingleton<IAgentRouter, AgentRouter>();
            services.AddSingleton<IMessageRoutes, MessageRoutes>();
            
            services.AddSingleton<IConversationHistoryService, ConversationHistoryService>();
            services.AddScoped<IConversationSummarize, ConversationSummarize>();

            services.AddKeyedSingleton<IAgent, SafetyAgent>("safety");
            services.AddKeyedSingleton<IAgent, ProductSearchAgent>("productsearch");
            services.AddKeyedSingleton<IAgent, ChristmasAgent>("christmas");

            return services;
        }
    }
}
