using AdventureWorks.Shop.AI.Abstractions.Configuration;
using AdventureWorks.Shop.AI.Abstractions.Conversations;
using AdventureWorks.Shop.AI.Agents.Plugins;
using AdventureWorks.Shop.AI.Agents.Prompts;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Core.Services;
using AdventureWorks.Shop.AI.GrainInterfaces;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Orleans;
using Orleans.Runtime;
using OrleansCodeGen.Orleans.Runtime;
using System.Net.Mail;
using System.Security.AccessControl;

namespace AdventureWorks.Shop.AI.Grains
{
    public class UserGrain : Grain, IUserGrain, IRemindable
    {
        private readonly IPersistentState<User> _user;
        private IPersistentState<HashSet<string>> _userConversations;
        private readonly IGrainFactory _grainFactory;
        private readonly AIServiceOptions _aiOptions;
        private readonly IEmailSender _emailSender;
        private readonly Kernel _kernel;

        public UserGrain(
        [PersistentState("Users", OrleansConfiguration.AdventureWorksStore)]
        IPersistentState<User> user,
        [PersistentState("UserConversations", OrleansConfiguration.AdventureWorksStore)]
        IPersistentState<HashSet<string>> userConversations,
        IGrainFactory grainFactory,
        IOptions<AIServiceOptions> aiOptions,
        IEmailSender emailSender)
        {
            _user = user;
            _userConversations = userConversations;
            _grainFactory = grainFactory;
            _aiOptions = aiOptions.Value;
            _emailSender = emailSender;

            // Create a kernel with OpenAI chat completion
            IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

            kernelBuilder.AddOpenAIChatCompletion(
                    modelId: AIModels.GPT_4_Turbo,
                    apiKey: _aiOptions.Key);

            kernelBuilder.Plugins.AddFromType<TimeInformation>();

            _kernel = kernelBuilder.Build();
        }

        public async Task AddConversationAsync(string conversationId)
        {
            _userConversations.State.Add(conversationId);
            await _userConversations.WriteStateAsync();
        }

        public async Task<List<Conversation>> GetConversationsAsync()
        {
            var conversations = new List<Conversation>();

            foreach (var conversation in _userConversations.State)
            {
                var conversationGrain = _grainFactory.GetGrain<IConversationGrain>(conversation);
                var conversationItem = await conversationGrain.GetConversation();
                conversations.Add(new Conversation {
                    Id = conversationItem.Id,
                    Title = conversationItem.Title,
                    CreatedOn = conversationItem.CreatedOn,
                    ModifiedOn = conversationItem.ModifiedOn
                });
            }

            return conversations;
        }

        public Task DeleteConversationAsync(string conversationId)
        {
            _userConversations.State.Remove(conversationId);
            return Task.CompletedTask;
        }

        public Task<User> GetUser()
        {
            return Task.FromResult(_user.State);
        }

        public Task SetUser(User user)
        {
            _user.State = user;
            return Task.CompletedTask;
        }

        public async Task ReceiveReminder(string reminderName, TickStatus status)
        {
            if ("UserNotBoughtAnything".Equals(reminderName))
            {
                var prompt = @"You are an shop assitant that is inquiring the shopper
                               if they need help with anything on the shop floor with a friendly greeting.
                               The shopper has not bought anything yet but may be interested.
                               Just output the full html code please. No comments or instructions please.";

                var response = await _kernel.InvokePromptAsync(prompt, new KernelArguments());
                var body = response.ToString().Replace("```html", "").Replace("```", "");

                var message = new MailMessage("assistant@adventureworks.ai.com", 
                    _user.State.Email, 
                    "We are here to help!", body)
                {
                    IsBodyHtml = true
                };

                await _emailSender.SendEmail(message);

                // stopping reminder so that it doesn't keep sending emails and call ai after the first call.
                // This is for demo purposes only currently.
                var shopperReminder = await this.GetReminder("UserNotBoughtAnything");

                if (shopperReminder is not null)
                {
                    await this.UnregisterReminder(shopperReminder);
                }
            }
        }

        public override async Task<Task> OnActivateAsync(CancellationToken cancellationToken)
        {
            string primaryKey = this.GetPrimaryKeyString();

            if (_user.State.Id is null || _user.State.Id == Guid.Empty.ToString())
            {
                _user.State.Id = primaryKey;
                
                if (_user.State.Name is null || _user.State.Name == string.Empty) 
                {
                    _user.State.Name = "Guest";
                }

                await _user.WriteStateAsync();
            }

            await this.RegisterOrUpdateReminder("UserNotBoughtAnything", TimeSpan.FromSeconds(10), TimeSpan.FromMinutes(1));

            return base.OnActivateAsync(cancellationToken);
        }
    }
}
