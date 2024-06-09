namespace AdventureWorks.Shop.AI.Core.Attributes
{
  [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
  public class SerializedTypeAttribute : Attribute
  {
    public SerializedTypeAttribute(string name)
    {
      Name = name;
    }

    public string Name { get; }
  }
}
