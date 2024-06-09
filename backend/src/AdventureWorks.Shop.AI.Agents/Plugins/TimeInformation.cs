using Microsoft.SemanticKernel;
using System.ComponentModel;

namespace AdventureWorks.Shop.AI.Agents.Plugins
{
  /// <summary>
  /// A plugin that returns the current time.
  /// </summary>
  public class TimeInformation
  {
    [KernelFunction]
    [Description("Retrieves the current time in UTC.")]
    public string GetCurrentUtcTime() => DateTime.UtcNow.ToString("R");
  }
}
