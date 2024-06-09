import { MessageProps, PositionEnum } from '../../types/messageProps';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import { MessageRowContainer } from './messageRowContainer';
import { View } from 'react-native';
import { isSameUser } from '../../utils';
import { Day } from '../utilities/day';
import { MessageDTO } from '../../types/messages';
import { Avatar } from '../avatars/avatar';
import MessageBubble from './messageBubble';

const MessageComponent = ({
  currentMessage,
  nextMessage,
  previousMessage,
  user,
  showUserAvatar,
  position,
  theme,
  containerStyle,
  onMessageLayout,
  renderAvatar: propRenderAvatar,
  children,
}: MessageProps<MessageDTO>) => {

  const renderAvatar = () => {
    if (
      user &&
      user.id &&
      currentMessage &&
      currentMessage.user &&
      user.id === currentMessage.user.id &&
      !showUserAvatar
    ) {
      return null
    }

    const avatarProps = {
      currentMessage,
      nextMessage,
      previousMessage,
      user,
      showUserAvatar,
      position,
      theme,
      renderAvatar
    };

    return <Avatar {...avatarProps} />
  };

  const renderBubble = () => {
    const bubbleProps = {
      currentMessage,
      nextMessage,
      previousMessage,
      user,
      showUserAvatar,
      position,
      theme,
      renderAvatar
    };

    return (
      <MessageBubble {...bubbleProps}>
        {children}
      </MessageBubble>
    );
  };

  const renderDay = () => {
    if (currentMessage && currentMessage.createdAt) {
      const dayProps = {
        currentMessage,
        nextMessage,
        previousMessage,
        user,
        showUserAvatar,
        position,
        theme,
        renderAvatar
      };
      return <Day {...dayProps} />;
    }
    return null;
  };

  const sameUser = isSameUser(currentMessage, nextMessage);

  return (
    <View onLayout={onMessageLayout}>
      {renderDay()}
      <MessageRowContainer theme={theme} currentMessage={currentMessage} sameUser={sameUser} position={position}>
        {position === PositionEnum.Left || position === PositionEnum.Center ? renderAvatar() : null}
        {renderBubble()}
        {position === PositionEnum.Right ? renderAvatar() : null}
      </MessageRowContainer>
    </View>
  );
};

MessageComponent.defaultProps = {
  theme: ThemeEnum.Light,
  position: PositionEnum.Left,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
  showUserAvatar: false,
  shouldUpdateMessage: undefined,
  onMessageLayout: undefined,
  renderAvatar: undefined,
};

export default MessageComponent;
