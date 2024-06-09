import { v4 as uuidv4 } from 'uuid';
import useCopilotStore from '../stores/copilotStore';
import {
  Author,
  MessageDTO,
  MessageType,
} from '../types/messages';
import { UpdateCurrentMessage } from '../types/copilotStoreType';
import { tryParseJSONArray } from '../utils/tryParseJSONObject';

const CopilotHandler = async (message: MessageDTO) => {
  const { name, conversation, setConversationMessage, updateCurrentMessage } =
    useCopilotStore.getState();
  const assistantMessage = {
    id: uuidv4(),
    type: MessageType.Message,
    content: '',
    createdAt: new Date(),
    user: {
      id: Author.ASSISTANT,
      name,
    },
    conversationId: conversation.id ?? null,
    messageVariables: null,
    like: null,
  };

  setConversationMessage(assistantMessage);

  await responseHandler(message, updateCurrentMessage);
};

const responseHandler = async (message: MessageDTO, updateCurrentMessage: UpdateCurrentMessage) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/conversations/converse`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': '1.0',
      },
      body: JSON.stringify({
        ...message,
      }),
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Here you can consume the response stream as needed
    const reader = response.body?.getReader(); // Get a ReadableStreamDefaultReader
    const decoder = new TextDecoder();
    let result = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read(); // Read data from the stream
        if (done) {
          break;
        }

        result += decoder.decode(value);

        const parseJson: MessageDTO[] = result.endsWith(']')
          ? tryParseJSONArray(result)
          : tryParseJSONArray(result + ']');

        if (parseJson.length > 0) {
          updateCurrentMessage(parseJson[parseJson.length - 1]);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default CopilotHandler;
