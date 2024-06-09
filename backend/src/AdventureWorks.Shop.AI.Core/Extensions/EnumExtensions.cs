using System.ComponentModel;

namespace AdventureWorks.Shop.AI.Core.Extensions
{
  public static class EnumExtensions
  {
    public static string ToLowerString(this Enum enumValue)
    {
      var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());
      var descriptionAttributes = (DescriptionAttribute[]?)fieldInfo?.GetCustomAttributes(typeof(DescriptionAttribute), false);
      return descriptionAttributes?.Length > 0 ? descriptionAttributes[0].Description.ToLower() : enumValue.ToString().ToLower();
    }
  }
}
