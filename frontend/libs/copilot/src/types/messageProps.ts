import { LayoutChangeEvent, ViewStyle } from 'react-native';
import { AvatarProps, DayProps, LeftRightCenterStyle } from './models';
import { MessageDTO, UserDTO } from './messages';
import { ThemeEnum } from '../stores/preferenceStore';

export enum PositionEnum {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type Position =
  | PositionEnum.Left
  | PositionEnum.Right
  | PositionEnum.Center;

export interface MessageProps<TMessage extends MessageDTO> {
  key: any;
  theme: ThemeEnum;
  showUserAvatar?: boolean;
  position: Position;
  currentMessage: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  user: UserDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  renderAvatar?(props: AvatarProps<TMessage>): React.ReactNode;
  onMessageLayout?(event: LayoutChangeEvent): void;
  children?: React.ReactNode;
}
