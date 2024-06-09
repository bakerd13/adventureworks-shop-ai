import {
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LeftRightCenterStyle } from '../../../types/models';
import { MessageDTO } from '../../../types/messages';
import { Position, PositionEnum } from '../../../types/messageProps';
import Markdown from 'react-native-markdown-display';
import { styles, markdownStyles } from './messageMarkdownContent.styles';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export interface MessageMarkdownProps {
  theme: ThemeEnum;
  position?: Position;
  currentMessage?: MessageDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: LeftRightCenterStyle<TextStyle>;
  linkStyle?: LeftRightCenterStyle<TextStyle>;
  textProps?: TextProps;
  customTextStyle?: StyleProp<TextStyle>;
}

export const MessageMarkdownContent = ({
  theme = ThemeEnum.Light,
  currentMessage = {} as MessageDTO,
  position = PositionEnum.Left,
  containerStyle,
  textStyle,
  linkStyle: linkStyleProp,
  customTextStyle,
  textProps,
}: MessageMarkdownProps) => {
  return (
    <View
      style={[
        styles[position](theme).container,
        containerStyle && containerStyle[position],
      ]}
    >
      <Markdown style={markdownStyles(theme)}>{currentMessage!.content}</Markdown>
    </View>
  );
}
