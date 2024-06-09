using AdventureWorks.Shop.AI.Abstractions.Conversations;

[assembly: GenerateCodeForDeclaringAssembly(typeof(Conversation))]
[assembly: GenerateCodeForDeclaringAssembly(typeof(Message))]
namespace AdventureWorks.Shop.AI.GrainInterfaces
{
    public interface IConversationGrain : IGrainWithStringKey
    {
        Task<Conversation> GetConversation();
        Task<Message> AddMessage(Message message);
        Task<IList<Message>> GetMessages();
        Task DeleteConversation();

        Task UpdateLikeAsync(string messageId, bool like);
    }

}
