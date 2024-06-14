using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Milvus.Client;
using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using AdventureWorks.Shop.AI.Milvus.Constants;
using Microsoft.SemanticKernel;
using AdventureWorks.Shop.AI.Abstractions.Conversations;

namespace AdventureWorks.Shop.AI.Milvus
{
    public class MessageRoutes : IMessageRoutes
    {
        private readonly ServicesOptions _servicesOptions;
        private readonly AIServiceOptions _aiOptions;
        private readonly Kernel _kernel;
        private readonly OpenAIPromptExecutionSettings _settings;

        public MessageRoutes(IOptions<ServicesOptions> servicesOptions,
            IOptions<AIServiceOptions> aiOptions)
        {
            ArgumentNullException.ThrowIfNull(servicesOptions);

            _servicesOptions = servicesOptions.Value;
            _aiOptions = aiOptions.Value;

            _settings = new()
            {
                ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
                MaxTokens = 1000,
                Temperature = 0
            };

            // Create a kernel with OpenAI chat completion
            IKernelBuilder kernelBuilder = Kernel.CreateBuilder();

            kernelBuilder.AddOpenAIChatCompletion(
                    modelId: AIModels.GPT_4_Turbo,
                    apiKey: _aiOptions.Key);

            _kernel = kernelBuilder.Build();

        }

        public async Task<string?> MessageRoute(Message ask)
        {
            ArgumentNullException.ThrowIfNull(_servicesOptions.VectorDatabaseEndpoint);

#pragma warning disable SKEXP0010 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
            var embeddingGenerator = new OpenAITextEmbeddingGenerationService(AIModels.Embedding, _aiOptions.Key);
#pragma warning restore SKEXP0010 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

            var embeddingAsk = new List<string>() { ask.Content };
            var embeddings = await embeddingGenerator.GenerateEmbeddingsAsync(embeddingAsk);

            // now to do a search on milvus
            MilvusClient milvusClient = new MilvusClient(_servicesOptions.VectorDatabaseEndpoint);
            var collection = milvusClient.GetCollection(Collections.ROUTES_COLLECTION_NAME);
            await collection.LoadAsync();
            await collection.WaitForCollectionLoadAsync(timeout: TimeSpan.FromSeconds(10));

            var searchResults = await collection.SearchAsync(
              RoutesTable.SearchField,
              (IReadOnlyList<ReadOnlyMemory<float>>)embeddings,
              SimilarityMetricType.L2,
              limit: 1,
              new SearchParameters
              {
                  OutputFields = { RoutesTable.RouteField },
                  ConsistencyLevel = ConsistencyLevel.Strong,
                  ExtraParameters = { ["nprobe"] = "10" }
              });

            await collection.ReleaseAsync();

            var searchResult = (FieldData<string>?)searchResults.FieldsData.FirstOrDefault(d => d.FieldName == RoutesTable.RouteField);
            var route = searchResult?.Data[0];
            return route;
        }
    }
}
