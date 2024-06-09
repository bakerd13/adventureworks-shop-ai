import { View } from "react-native";
import { styles } from './messageRowContainer.styles';
import { ReactNode } from "react";
import { Position } from "../../types/messageProps";
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import { Author, MessageDTO } from "../../types/messages";

type MessageRowContainerProps = {
  theme: ThemeEnum;
  currentMessage: MessageDTO;
  sameUser: boolean;
  position: Position;
  children: ReactNode;
};

export const MessageRowContainer = ({ theme, currentMessage, sameUser, position, children }: MessageRowContainerProps) => {
  return (
    <View
      style={[
        styles[position](theme).container,
        { marginBottom: sameUser ? 2 : 10 },
        { marginBottom: 2 },
        currentMessage.user.id === Author.ASSISTANT && styles[position](theme).assistantUser
      ]}
    >
      <View style={[styles[position](theme).messageContainer]}>{children}</View>
    </View>
  );
}
