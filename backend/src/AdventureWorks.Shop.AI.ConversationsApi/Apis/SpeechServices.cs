using Microsoft.AspNetCore.Antiforgery;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AudioToText;
using Microsoft.SemanticKernel.TextToAudio;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public class SpeechServices(
        [FromKeyedServices("SpeechAudioToTextKernel")] Kernel audioToTextSpeech,
        [FromKeyedServices("SpeechTextToAudioKernel")] Kernel textToAudioSpeech,
        IAntiforgery antiforgery,
        ILogger<SpeechServices> logger)
    {
#pragma warning disable SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
        public Kernel AudioToTextSpeech { get; } = audioToTextSpeech; // audioToTextSpeech.GetRequiredService<IAudioToTextService>();

        public Kernel TextToAudioSpeech { get; } = textToAudioSpeech; // speechTextToAudioKernel.GetRequiredService<ITextToAudioService>();

#pragma warning restore SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
        public IAntiforgery Antiforgery { get; } = antiforgery;

        public ILogger<SpeechServices> Logger { get; } = logger;
    }
}
