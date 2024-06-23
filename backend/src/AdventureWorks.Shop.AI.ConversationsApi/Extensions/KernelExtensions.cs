using AdventureWorks.Shop.AI.Core.Constants;
using AdventureWorks.Shop.AI.Core.Options;
using Microsoft.SemanticKernel;

namespace AdventureWorks.Shop.AI.ConversationsApi.Extensions
{
    public static class KernelExtensions
    {
        internal static IServiceCollection AddKernels(this IServiceCollection services, ConfigurationManager configuration)
        {
            var aiConfig = configuration.GetSection(AIServiceOptions.PropertyName);
            var aiOptions = aiConfig.Get<AIServiceOptions>();

            // Ensure apiKey is not null by providing a fallback value or handling the null case
            string apiKey = aiOptions?.Key ?? throw new InvalidOperationException("API Key is not configured.");

            services.AddKeyedScoped<Kernel>("SpeechAudioToTextKernel", (sp, key) =>
            {
                IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
#pragma warning disable SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
                kernelBuilder.AddOpenAIAudioToText(
                    modelId: AIModels.AudioToTextModel,
                    apiKey: apiKey);
#pragma warning restore SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

                return kernelBuilder.Build();
            });

            services.AddKeyedScoped<Kernel>("SpeechTextToAudioKernel", (sp, key) =>
            {
                IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
#pragma warning disable SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
                kernelBuilder.AddOpenAITextToAudio(
                    modelId: AIModels.TextToAudioModel,
                    apiKey: apiKey);
#pragma warning restore SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

                return kernelBuilder.Build();
            });

            return services;
        }
    }
}
