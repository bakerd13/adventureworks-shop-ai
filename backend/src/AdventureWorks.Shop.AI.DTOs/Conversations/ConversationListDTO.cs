using Newtonsoft.Json;

namespace AdventureWorks.Shop.AI.DTOs.Conversations
{
    public class ConversationListDTO
    {
        [JsonProperty("id")]
        public string? Id { get; set; }

        [JsonProperty("title")]
        public string? Title { get; set; }

        [JsonProperty("createdOn")]
        public DateTimeOffset CreatedOn { get; set; }

        [JsonProperty("modifiedOn")]
        public DateTimeOffset ModifiedOn { get; set; }
    }
}
