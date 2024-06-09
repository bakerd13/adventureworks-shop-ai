using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.DTOs.Conversations;

namespace AdventureWorks.Shop.AI.Agents
{
  public interface IAgent
  {
    IAsyncEnumerable<MessageDTO> Ask(Message ask);
  }
}
