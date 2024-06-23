import { StyleProp, ViewStyle } from 'react-native';
import { LightboxProps } from 'react-native-lightbox-v2';
import { MessageDTO } from './messages';

export { ActionsProps } from '../components/actions';
export { AvatarProps } from '../components/avatars/avatar';
export { ComposerProps } from '../components/inputs/composers/composer';
export { DayProps } from '../components/utilities/day';
export { CopilotAvatarProps } from '../components/avatars/copilotAvatar';
export { InputToolbarProps } from '../components/inputs/inputToolbar';

export { MessageContainerProps } from '../components/messages/messageContainer';
export { MessageTextProps } from '../components/messages/text/messageText';
export { TimeProps } from '../components/utilities/time';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface LeftRightCenterStyle<T> {
  center?: StyleProp<T>;
  left?: StyleProp<T>;
  right?: StyleProp<T>;
}

export interface MessageVideoProps<TMessage extends MessageDTO> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  videoStyle?: StyleProp<ViewStyle>;
  videoProps?: object;
  lightboxProps?: LightboxProps;
}

export interface MessageAudioProps<TMessage extends MessageDTO> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  audioStyle?: StyleProp<ViewStyle>;
  audioProps?: object;
}
