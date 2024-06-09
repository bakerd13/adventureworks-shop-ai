using Newtonsoft.Json;

namespace AdventureWorks.Shop.AI.DTOs.Conversations
{
  public class SavedConversationDTO
  {
        [JsonProperty("title")]
        public string Title { get; set; } = string.Empty;

        [JsonProperty("modifiedOn")]
        public DateTimeOffset ModifiedOn { get; set; }
    }
}
