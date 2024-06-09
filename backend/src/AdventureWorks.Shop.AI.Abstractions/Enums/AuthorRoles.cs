using System.ComponentModel;

namespace AdventureWorks.Shop.AI.Abstractions.Enums
{
  /// <summary>
  /// Role of the author of a chat message.
  /// </summary>
  public enum AuthorRoles
  {
    /// <summary>
    /// The bot.
    /// </summary>
    [Description("assistant")]
    Assistant = 0,

    /// <summary>
    /// A system author.
    /// </summary>
    [Description("system")]
    System = 1,

    /// <summary>
    /// A user of the chat.
    /// </summary>
    [Description("user")]
    User = 2,
  }
}
