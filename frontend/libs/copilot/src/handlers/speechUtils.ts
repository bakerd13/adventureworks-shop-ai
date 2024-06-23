import { Audio } from 'expo-av';

export const GetTranslation = async (content: string | undefined, id: string | undefined): Promise<Audio.Sound> => {
    if (!content) {
        return undefined;
    }

    const response = await responseHandler(content);
    // Check if the response is okay
    if (!response || !response.ok  || !response.body) {
      throw new Error('Failed to fetch audio data');
    }

    const data = await streamToArrayBuffer(response.body);
    const json = uint8ArrayToJson(data);

    return await playSound(json.contentType, json.fileContents);
}

const responseHandler = async (content: string) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/speech/text-to-speech`;
  
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Api-Version': '1.0',
          },
          body: JSON.stringify({
              content: content,
          }),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Add a return statement here
    }
};

const playSound = async (contentType: string, audioContent: string) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const { sound } = await Audio.Sound.createAsync(
      { uri: `data:${contentType};base64,${audioContent}` },
      { shouldPlay: true },
    );

    await sound.playAsync();
    return sound;
  }

const concatArrayBuffers = (chunks: Uint8Array[]): Uint8Array => {
    const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}

function uint8ArrayToJson(uint8Array: Uint8Array): any {
  const decoder = new TextDecoder('utf-8');
  const jsonStr = decoder.decode(uint8Array);
  return JSON.parse(jsonStr);
}

const streamToArrayBuffer = async (stream: ReadableStream<Uint8Array>): Promise<Uint8Array> => {
    const chunks: Uint8Array[] = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        } else {
            chunks.push(value);
        }
    }
    return concatArrayBuffers(chunks);
}

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}