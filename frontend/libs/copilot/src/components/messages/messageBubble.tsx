import React, { ReactNode, useContext } from 'react';
import {
  Clipboard,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { CopilotContext } from '../../contexts/copilotContext';
import { Time } from '../utilities/time';
import { isSameUser, isSameDay } from '../../utils';
import { LeftRightCenterStyle } from '../../types/models';
import { MessageDTO, UserDTO } from '../../types/messages';
import { Position, PositionEnum } from '../../types/messageProps';

import { styles } from './messageBubble.styles';
import { ChatMessageLoading } from '../utilities/chatMessageLoading';
import { MessageToolbar } from './messageToolbar';

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];

export interface MessageBubbleProps {
  user?: UserDTO;
  children: ReactNode;
  touchableProps?: object;
  position: Position;
  currentMessage?: MessageDTO;
  nextMessage?: MessageDTO;
  previousMessage?: MessageDTO;
  optionTitles?: string[];
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  wrapperStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: LeftRightCenterStyle<TextStyle>;
  bottomContainerStyle?: LeftRightCenterStyle<ViewStyle>;
  containerToNextStyle?: LeftRightCenterStyle<ViewStyle>;
  containerToPreviousStyle?: LeftRightCenterStyle<ViewStyle>;
  usernameStyle?: TextStyle;
  onPress?(context?: unknown, message?: unknown): void;
  onLongPress?(context?: unknown, message?: unknown): void;
}

const MessageBubble = ({
  user,
  children,
  touchableProps,
  position,
  currentMessage,
  nextMessage,
  previousMessage,
  optionTitles = DEFAULT_OPTION_TITLES,
  containerStyle = {},
  wrapperStyle = {},
  bottomContainerStyle = {},
  usernameStyle = {},
  containerToNextStyle = {},
  containerToPreviousStyle = {},
  onPress,
  onLongPress,
}: MessageBubbleProps) => {
  const context = useContext(CopilotContext);

  const handlePress = () => {
    if (onPress) {
      onPress(context, currentMessage);
    }
  };

  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(context, currentMessage);
    } else if (currentMessage && currentMessage.content) {
      const options =
        optionTitles && optionTitles.length > 0
          ? optionTitles.slice(0, 2)
          : DEFAULT_OPTION_TITLES;
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(currentMessage.content);
              break;
            default:
              break;
          }
        }
      );
    }
  };

  const styledBubbleToNext = () => {
    if (
      currentMessage &&
      nextMessage &&
      position &&
      isSameUser(currentMessage, nextMessage) &&
      isSameDay(currentMessage, nextMessage)
    ) {
      return [
        styles[position].containerToNext,
        containerToNextStyle && containerToNextStyle[position],
      ];
    }
    return null;
  };

  const styledBubbleToPrevious = () => {
    if (
      currentMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      return [
        styles[position].containerToPrevious,
        containerToPreviousStyle && containerToPreviousStyle[position],
      ];
    }
    return null;
  };

  const renderMessageContent = () => {
    if (currentMessage && currentMessage.content) {
      return children;
    }
    return null;
  };

  const renderEmptyText = () => {
    if (currentMessage?.content.length === 0) {
      return <ChatMessageLoading />;
    }
    return null;
  };

  const renderTime = () => {
    if (currentMessage && currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, textStyle, ...timeProps } = {
        containerStyle,
        wrapperStyle,
        textStyle,
      };

      return <Time {...timeProps} />;
    }
    return null;
  };

  const renderLikes = () => {
    return <MessageToolbar currentMessage={currentMessage} />;
  };

  const renderBubbleContent = () => (
    <View>
      {renderMessageContent()}
      {renderEmptyText()}
    </View>
  );

  return (
    <View
      style={[
        styles[position].container,
        containerStyle && containerStyle[position],
      ]}
    >
      <View
        style={[
          styles[position].wrapper,
          styledBubbleToNext(),
          styledBubbleToPrevious(),
          wrapperStyle && wrapperStyle[position],
        ]}
      >
        <TouchableWithoutFeedback
          onPress={handlePress}
          onLongPress={handleLongPress}
          accessibilityRole="text"
          {...touchableProps}
        >
          <View>
            {renderBubbleContent()}
            <View style={[styles[position].footer]}>
              {renderTime()}
              {renderLikes()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

MessageBubble.defaultProps = {
  touchableProps: {},
  onPress: null,
  onLongPress: null,
  position: PositionEnum.Left,
  optionTitles: DEFAULT_OPTION_TITLES,
  currentMessage: {
    content: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  bottomContainerStyle: {},
  usernameStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
};

export default MessageBubble;
