using AdventureWorks.Shop.AI.Abstractions.Enums;
using Newtonsoft.Json;

namespace AdventureWorks.Shop.AI.DTOs.Conversations
{
    [Serializable]
    public class MessageDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonProperty("messageType")]
        // [JsonConverter(typeof(MessageTypeConverter))]
        public MessageType? MessageType { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; } = string.Empty;

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("user")]
        public UserDTO User { get; set; } = new UserDTO();

        [JsonProperty("conversationId")]
        public string? ConversationId { get; set; }

        [JsonProperty("contextVariables")]
        public IList<MessageVariableDTO>? MessageVariables { get; set; }

        [JsonProperty("like")]
        public bool? Like { get; set; }
    }
}
