using AdventureWorks.Shop.AI.DTOs.Speech;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AudioToText;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.TextToAudio;

namespace AdventureWorks.Shop.AI.ConversationsApi.Apis
{
    public static class SpeechApi
    {
        private static Random random = new Random();

        public static RouteGroupBuilder MapSpeechApiEndpointsV1(this IEndpointRouteBuilder app)
        {
            var api = app.MapGroup("api/speech").HasApiVersion(1.0);

            api.MapPost("/speech-to-text", SpeechAudioToTextAsync).DisableAntiforgery();
            api.MapPost("/text-to-speech", SpeechTextToAudioAsync);

            return api;
        }

        public static async Task<Results<Ok<string>, BadRequest<string>>> SpeechAudioToTextAsync(IFormFile file, HttpContext httpContext, [AsParameters] SpeechServices services)
        {
            // await services.Antiforgery.ValidateRequestAsync(httpContext);

            if (file == null || file.Length == 0)
            {
                return TypedResults.BadRequest("File is empty or not provided.");
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                // Set execution settings (optional)
#pragma warning disable SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
                OpenAIAudioToTextExecutionSettings executionSettings = new($"{GetRandomLetters()}.wav")
                {
                    Language = "en", // The language of the audio data as two-letter ISO-639-1 language code (e.g. 'en' or 'es').
                    Prompt = "ignore urm and background noise and keep to point", // An optional text to guide the model's style or continue a previous audio segment.
                                              // The prompt should match the audio language.
                    ResponseFormat = "json", // The format to return the transcribed text in.
                                             // Supported formats are json, text, srt, verbose_json, or vtt. Default is 'json'.
                    Temperature = 0.3f, // The randomness of the generated text.
                                        // Select a value from 0.0 to 1.0. 0 is the default.
                };

                AudioContent audioContent = new(stream.ToArray());
                var audioToTextSpeechService = services.AudioToTextSpeech.GetRequiredService<IAudioToTextService>();
                var textContent = await audioToTextSpeechService.GetTextContentAsync(audioContent, executionSettings);

#pragma warning restore SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

                return TypedResults.Ok(textContent.Text);
            }
        }


        public static async Task<Results<Ok<FileContentResult>, BadRequest<string>>> SpeechTextToAudioAsync(SpeechContentDTO dto, [AsParameters] SpeechServices services)
        {
#pragma warning disable SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
            OpenAITextToAudioExecutionSettings executionSettings = new()
            {
                Voice = "alloy", // The voice to use when generating the audio.
                                 // Supported voices are alloy, echo, fable, onyx, nova, and shimmer.
                ResponseFormat = "mp3", // The format to audio in.
                                        // Supported formats are mp3, opus, aac, and flac.
                Speed = 1.0f // The speed of the generated audio.
                             // Select a value from 0.25 to 4.0. 1.0 is the default.
            };

            var textToAudioSpeechService = services.TextToAudioSpeech.GetRequiredService<ITextToAudioService>();
            AudioContent audioContent = await textToAudioSpeechService.GetAudioContentAsync(dto.Content, executionSettings);

#pragma warning restore SKEXP0001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

            if (audioContent.Data is null || audioContent.Data.Value.IsEmpty)
            {
                return TypedResults.BadRequest("Failed to generate audio content.");
            }

            // Return the MP3 data as a FileResult
            return TypedResults.Ok(new FileContentResult(audioContent.Data.Value.ToArray(), "audio/mpeg")
            {
                FileDownloadName = $"{GetRandomLetters()}.mp3"
            });
        }

        private static string GetRandomLetters(int length = 10)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            char[] stringChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            return new String(stringChars);
        }
    }
}
