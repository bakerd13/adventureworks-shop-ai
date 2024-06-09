using Newtonsoft.Json;

namespace AdventureWorks.Shop.AI.DTOs.Conversations
{
  public class UserDTO
  {
    [JsonProperty("id")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [JsonProperty("name")]
    public string Name { get; set; } = "Assistant";

    [JsonProperty("avatar")]
    public string? Avatar { get; set; }
  }
}
