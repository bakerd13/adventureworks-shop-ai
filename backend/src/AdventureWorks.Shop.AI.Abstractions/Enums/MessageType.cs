using System.ComponentModel;

namespace AdventureWorks.Shop.AI.Abstractions.Enums
{
  [Serializable]
  public enum MessageType : byte
  {
    [Description("message")]
    Message = 0,

    [Description("document")]
    Document = 1,

    [Description("image")]
    Image = 2,

    [Description("camera")]
    Camera = 3,

    [Description("audio")]
    Audio = 4,

    [Description("markdown")]
    Markdown = 5,

    [Description("component")]
    Component = 6,
  }
}
