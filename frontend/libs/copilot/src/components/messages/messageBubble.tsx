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
import { MessageDTO  } from '../../types/messages';
import { Position, PositionEnum } from '../../types/messageProps';
import { styles } from './messageBubble.styles';
import { ChatMessageLoading } from '../utilities/chatMessageLoading';
import { MessageToolbar } from './messageToolbar';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];

export interface MessageBubbleProps {
  children: ReactNode;
  touchableProps?: object;
  theme: ThemeEnum;
  position: Position;
  currentMessage?: MessageDTO;
  nextMessage?: MessageDTO;
  previousMessage?: MessageDTO;
  optionTitles?: string[];
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  wrapperStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: LeftRightCenterStyle<TextStyle>;
  containerToNextStyle?: LeftRightCenterStyle<ViewStyle>;
  containerToPreviousStyle?: LeftRightCenterStyle<ViewStyle>;
  onPress?(context?: unknown, message?: unknown): void;
  onLongPress?(context?: unknown, message?: unknown): void;
}

const MessageBubble = ({
  children,
  touchableProps,
  theme,
  position,
  currentMessage,
  nextMessage,
  previousMessage,
  optionTitles = DEFAULT_OPTION_TITLES,
  containerStyle = {},
  wrapperStyle = {},
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
        styles[position](theme).containerToNext,
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
        styles[position](theme).containerToPrevious,
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
      return <ChatMessageLoading theme={theme} />;
    }
    return null;
  };

  const renderTime = () => {
    if (currentMessage && currentMessage.createdAt) {
      return <Time containerStyle={containerStyle} />;
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
        styles[position](theme).container,
        containerStyle && containerStyle[position],
      ]}
    >
      <View
        style={[
          styles[position](theme).wrapper,
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
            <View style={[styles[position](theme).footer]}>
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
