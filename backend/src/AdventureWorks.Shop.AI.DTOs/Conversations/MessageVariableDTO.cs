using Newtonsoft.Json;

namespace AdventureWorks.Shop.AI.DTOs.Conversations
{
  public class MessageVariableDTO
  {
        [JsonProperty("key")]
        public string Key { get; set; } = string.Empty;

        [JsonProperty("value")]
        public string Value { get; set; } = string.Empty;
  }
}
