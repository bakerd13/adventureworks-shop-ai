export const Author = {
  SYSTEM: 'System',
  USER: 'User',
  ASSISTANT: 'Assistant',
  FUNCTION: 'Function',
  UNKNOWN: 'Unknown',
} as const;

/**
 * Type of the chat message. A copy of ChatMessageType in the API C# code.
 */
export enum MessageType {
  Message,
  Document,
  Image,
  Camera,
  Audio,
  Markdown,
  Component,
}

export const MessageTypeDescription = {
  [MessageType.Message]: 'message',
  [MessageType.Document]: 'document',
  [MessageType.Image]: 'image',
  [MessageType.Camera]: 'camera',
  [MessageType.Audio]: 'audio',
  [MessageType.Markdown]: 'markdown',
  [MessageType.Component]: 'component',
};

type renderFunction = (x: any) => JSX.Element;

export type MessageVariableDTO = {
  key: string;
  value: string;
};

export type UserDTO = {
  id?: (typeof Author)[keyof typeof Author] | string;
  name?: string;
  avatar?: string | number | renderFunction;
};

export type ConversationDTO = {
  id?: string | undefined | null;
  Title?: string;
  CreatedOn?: Date;
  ModifiedOn?: Date;
  messages: MessageDTO[];
};

export type MessageDTO = {
  id: string;
  messageType?: MessageType;
  content: string;
  image?: string;
  createdAt: Date | number;
  user: UserDTO;
  conversationId: string | undefined | null;
  messageVariables: MessageVariableDTO[] | null;
  like: boolean | null;
};

export type savedConversationDTO = {
  title: string;
  ModifiedOn?: Date;
};

export type ConversationListDTO = {
  id: string;
  title?: string;
  createdOn?: Date;
  ModifiedOn?: Date;
};

export type LikeDTO = {
  id: string;
  conversationId: string;
  like: boolean;
};
