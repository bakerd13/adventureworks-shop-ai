using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Agents.Routers
{
  public interface IAgentRouter
  {
    Task<IAgent> Query(Message ask);
  }
}
