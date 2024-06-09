
namespace AdventureWorks.Shop.AI.Core.Options
{
  public class ServicesOptions
  {
    public const string PropertyName = "Services";

    /// <summary>
    /// Address of vector database.
    /// </summary>
    public string? VectorDatabaseEndpoint { get; set; }
  }
}
