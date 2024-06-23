import useCopilotStore from '../stores/copilotStore';
import useCopilotCameraStore from '../stores/copilotCameraStore';
import useCopilotAccessoryStore from '../stores/copilotAccessoryStore';
import {
  Author,
  MessageDTO,
  MessageType,
} from '../types/messages';
import { GetTranslation } from './speechUtils';

const MessageHandler = async (message: MessageDTO) => {
  const {
    setText,
    copilotHandler,
    setConversationMessage,
    deleteConversationMessage,
  } = useCopilotStore.getState();
  const { setCameraState } = useCopilotAccessoryStore.getState();
  const { picture, resetCameraState } = useCopilotCameraStore.getState();

  if (picture) {
    message?.messageVariables?.push({ key: 'image', value: picture });
    deleteConversationMessage(MessageType.Camera);
    setCameraState();
    resetCameraState();
  }

  setConversationMessage(message);

  if (copilotHandler === undefined || copilotHandler === null) {
    throw new Error('Copilot Handler is not set');
  }

  setText('');
  await copilotHandler(message);
};

export default MessageHandler;
