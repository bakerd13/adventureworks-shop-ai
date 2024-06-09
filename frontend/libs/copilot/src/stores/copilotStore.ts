import { create } from 'zustand';
import CopilotHandler from '../handlers/copilotHandler';
import { CopilotHandlerType, CopilotStore } from '../types/copilotStoreType';
import {
  ConversationDTO,
  MessageDTO,
  MessageType,
  savedConversationDTO,
} from '../types/messages';

export const useCopilotStore = create<CopilotStore>((set, get) => ({
  name: 'Copilot Store',
  conversation: { messages: [] },
  messagesUpdateCount: 0,
  text: undefined,
  libraryVisible: false,
  settingsVisible: false,
  setText: (text: string) => {
    set((state) => ({
      text,
    }));
  },
  copilotHandler: CopilotHandler,
  setCurrentConversation: async (
    conversation: ConversationDTO
  ): Promise<void> => {
    set((state) => ({
      conversation,
    }));
  },
  saveConversation: async (
    savedConversation: savedConversationDTO
  ): Promise<void> => {
    set((state) => ({
      conversation: {
        title: savedConversation.title,
        messages: state.conversation.messages,
      },
    }));
  },
  clearConversation: (): void => {
    set((state) => ({
      conversation: { messages: [] },
    }));
  },
  deleteConversationMessage: (messageType: MessageType): void => {
    const messages = get().conversation.messages;
    const filteredMessages = messages.filter(
      (message) => message.messageType !== messageType
    );

    set((state) => ({
      conversation: { messages: filteredMessages },
    }));
  },
  setConversationMessage: (message: MessageDTO) => {
    set((state) => ({
      conversation: {
        messages: [...state.conversation.messages, message],
      },
    }));
  },
  updateConversationMessage: (message: MessageDTO) => {
    const messages = get().conversation.messages;
    const updatedMessages = messages.map((updatedMessage) => {
      if (updatedMessage.id === message.id) {
        return { ...updatedMessage, ...message };
      }
      return updatedMessage;
    });

    set((state) => ({
      conversation: {
        messages: [...updatedMessages],
      },
    }));
  },
  updateCurrentMessage: (message: MessageDTO) => {
    const messages = get().conversation.messages;
    if (messages === undefined) {
      throw new Error('No messages to update');
    }

    messages[messages.length - 1] = message;

    set((state) => ({
      conversation: { id: message.conversationId, messages },
      messagesUpdateCount: state.messagesUpdateCount + 1,
    }));
  },
  setCopilotHandler: (handler: CopilotHandlerType) => {
    set(() => ({
      copilotHandler: handler,
    }));
  },
}));

export default useCopilotStore;
