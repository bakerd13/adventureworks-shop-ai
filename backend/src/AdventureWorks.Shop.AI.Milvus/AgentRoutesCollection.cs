using AdventureWorks.Shop.AI.Milvus.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Milvus.Client;
using Newtonsoft.Json;
using System.Reflection;
using AdventureWorks.Shop.AI.Core.Constants;

namespace AdventureWorks.Shop.AI.Milvus
{
    public class AgentRoutesCollection : IAgentRoutesCollection
    {
        private readonly ServicesOptions _servicesOptions;
        private readonly AIServiceOptions _aiOptions;

        public AgentRoutesCollection(IOptions<ServicesOptions> servicesOptions, IOptions<AIServiceOptions> aiOptions)
        {
            ArgumentNullException.ThrowIfNull(servicesOptions);

            _servicesOptions = servicesOptions.Value;
            _aiOptions = aiOptions.Value;
        }

        public async Task<bool> SeedAgentRoutesAsync()
        {
            ArgumentNullException.ThrowIfNull(_servicesOptions.VectorDatabaseEndpoint);

            // Get the assembly where the resource is embedded
            Assembly assembly = Assembly.GetExecutingAssembly();

            // Read the embedded resource
            using (Stream stream = assembly.GetManifestResourceStream("AdventureWorks.Shop.AI.Milvus.RouteData.json"))
            {
                if (stream == null)
                {
                    return false;
                }

                MilvusClient milvusClient = new MilvusClient(_servicesOptions.VectorDatabaseEndpoint);

                if (milvusClient is null)
                {
                    return false; 
                }

                var collection = milvusClient.GetCollection(Collections.ROUTES_COLLECTION_NAME);

                //Check if this collection exists
                var hasCollection = await milvusClient.HasCollectionAsync(Collections.ROUTES_COLLECTION_NAME);

                if (hasCollection)
                {
                    await collection.DropAsync();
                    Console.WriteLine("Drop collection {0}", Collections.ROUTES_COLLECTION_NAME);
                }

                var schema = new CollectionSchema
                {
                    Fields = {
            FieldSchema.Create<long>(RoutesTable.IdField, isPrimaryKey: true, autoId: true),
            FieldSchema.CreateVarchar(RoutesTable.RouteField, maxLength: 200),
            FieldSchema.CreateFloatVector(RoutesTable.SearchField, dimension: 1536)
          },
                    Description = "routing for agents",
                    EnableDynamicFields = true
                };

                await milvusClient.CreateCollectionAsync(Collections.ROUTES_COLLECTION_NAME, schema);

#pragma warning disable SKEXP0010 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
                var embeddingGenerator = new OpenAITextEmbeddingGenerationService(AIModels.Embedding, _aiOptions.Key);
#pragma warning restore SKEXP0010 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

                // Read JSON content from the embedded resource
                using (StreamReader reader = new StreamReader(stream))
                {
                    string jsonContent = await reader.ReadToEndAsync();

                    // Deserialize JSON
                    AgentRouteRootData? rootData = JsonConvert.DeserializeObject<AgentRouteRootData>(jsonContent);

                    if (rootData != null)
                    {
                        // Seed routes and questions
                        foreach (var route in rootData.Routes)
                        {
                            var routeNames = new List<string>();
                            IReadOnlyList<ReadOnlyMemory<float>> routeQuestions = new List<ReadOnlyMemory<float>>();

                            routeNames.Add(route.Route);

                            foreach (var question in route.Questions)
                            {
                                var embeddingQuestion = new List<string>() { question };
                                var embeddings = await embeddingGenerator.GenerateEmbeddingsAsync(embeddingQuestion);

                                await milvusClient.GetCollection(Collections.ROUTES_COLLECTION_NAME).InsertAsync(new FieldData[] {
                  FieldData.CreateVarChar(RoutesTable.RouteField, routeNames),
                  FieldData.CreateFloatVector(RoutesTable.SearchField, (IReadOnlyList<ReadOnlyMemory<float>>)embeddings)
              });
                            }
                        }
                    }
                }

                var indexType = IndexType.IvfFlat;
                var metricType = SimilarityMetricType.L2;
                var extraParams = new Dictionary<string, string> { ["nlist"] = "1024" };

                await collection.CreateIndexAsync(RoutesTable.SearchField, indexType, metricType, "routes_vector_idx", extraParams: extraParams);

                await collection.LoadAsync();

                return true;
            }
        }

        public Task DeleteAgentRoutesAsync()
        {
            ArgumentNullException.ThrowIfNull(_servicesOptions.VectorDatabaseEndpoint);

            MilvusClient milvusClient = new MilvusClient(_servicesOptions.VectorDatabaseEndpoint);
            var collection = milvusClient.GetCollection(Collections.ROUTES_COLLECTION_NAME);
            return collection.DropAsync();
        }
    }
}
