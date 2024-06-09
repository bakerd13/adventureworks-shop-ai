import { ConversationDTO, MessageDTO, MessageType, savedConversationDTO } from "./messages";

export type  CopilotHandlerType = (message: MessageDTO) => Promise<void>;
export type  UpdateCurrentMessage = ( message: MessageDTO) => void;

export type CopilotStore = {
  name: string;
  conversation: ConversationDTO;
  messagesUpdateCount: number;
  text: string | undefined;
  setText: ( content: string) => void;
  copilotHandler: CopilotHandlerType;
  setCurrentConversation: (conversation: ConversationDTO) => Promise<void>;
  saveConversation: (savedConversation: savedConversationDTO) => Promise<void>;
  clearConversation: () => void;
  deleteConversationMessage: (messageType: MessageType) => void;
  setConversationMessage: ( message: MessageDTO) => void;
  updateConversationMessage: ( message: MessageDTO) => void;
  updateCurrentMessage: UpdateCurrentMessage;
};
