using AdventureWorks.Shop.AI.Agents.Routers;
using AdventureWorks.Shop.AI.Agents.Services;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public class ConversationsServices(
        IAgentRouter agentRouter,
        IConversationHistoryService conversationHistory,
        ILogger<ConversationsServices> logger)
    {
        public IAgentRouter AgentRouter { get; set; } = agentRouter;

        public IConversationHistoryService ConversationHistory { get; } = conversationHistory;

        public ILogger<ConversationsServices> Logger { get; } = logger;
    }
}
