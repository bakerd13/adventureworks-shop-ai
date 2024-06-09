import { View, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import ColpilotAvatar from './copilotAvatar';
import { isSameUser, isSameDay } from '../../utils';
import { LeftRightCenterStyle } from '../../types/models';
import { MessageDTO, UserDTO } from '../../types/messages';
import { Position, PositionEnum } from '../../types/messageProps';

import { styles } from './avatar.styles';

export interface AvatarProps {
  currentMessage?: MessageDTO;
  previousMessage?: MessageDTO;
  nextMessage?: MessageDTO;
  position: Position;
  imageStyle?: LeftRightCenterStyle<ImageStyle>;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: TextStyle;
  onPressAvatar?(user: UserDTO): void;
  onLongPressAvatar?(user: UserDTO): void;
}

export const Avatar = (props: AvatarProps) => {
  const {
    containerStyle,
    position,
    currentMessage,
    nextMessage,
    imageStyle,
  } = props;
  const messageToCompare = nextMessage;
  const computedStyle = 'onTop';

  if (
    currentMessage &&
    messageToCompare &&
    isSameUser(currentMessage, messageToCompare) &&
    isSameDay(currentMessage, messageToCompare)
  ) {
    return (
      <View
        style={[
          styles[position].container,
          containerStyle && containerStyle[position],
        ]}
      >
        <ColpilotAvatar
          avatarStyle={
            [
              styles[position].image,
              imageStyle && imageStyle[position],
            ] as ImageStyle
          }
        />
      </View>
    );
  }

  const renderAvatarComponent = () => {
    if (props.currentMessage) {
      return (
        <ColpilotAvatar
          avatarStyle={
            [
              styles[props.position].image,
              props.imageStyle && props.imageStyle[props.position],
            ] as ImageStyle
          }
          user={props.currentMessage.user}
          onPress={() => props.onPressAvatar?.(props.currentMessage!.user)}
          onLongPress={() =>
            props.onLongPressAvatar?.(props.currentMessage!.user)
          }
        />
      );
    }

    return null;
  };

  return (
    <View
      style={[
        styles[position].container,
        styles[position][computedStyle],
        containerStyle && containerStyle[position],
      ]}
    >
      {renderAvatarComponent()}
    </View>
  );
}

Avatar.defaultProps = {
  position: PositionEnum.Left,
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  onPressAvatar: () => {},
  onLongPressAvatar: () => {},
};
