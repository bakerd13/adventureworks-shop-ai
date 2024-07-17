import {
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { LeftRightCenterStyle } from '../../../types/models';
import { Position, PositionEnum } from '../../../types/messageProps';
import Markdown from 'react-native-markdown-display';
import { styles, tagsStyles } from './messageHtmlContent.styles';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import { MessageDTO } from '../../../types/messages';

export interface MessageHtmlProps {
  theme: ThemeEnum;
  position?: Position;
  currentMessage?: MessageDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: LeftRightCenterStyle<TextStyle>;
  linkStyle?: LeftRightCenterStyle<TextStyle>;
  textProps?: TextProps;
  customTextStyle?: StyleProp<TextStyle>;
}

export const MessageHtmlContent = ({
  theme = ThemeEnum.Light,
  currentMessage = {} as MessageDTO,
  position = PositionEnum.Left,
  containerStyle,
  textStyle,
  linkStyle: linkStyleProp,
  customTextStyle,
  textProps,
}: MessageHtmlProps) => {
  return (
    <View
      style={[
        styles[position](theme).container,
        containerStyle && containerStyle[position],
      ]}
    >
      <RenderHtml source={{ html: currentMessage!.content }}
        tagsStyles={tagsStyles(theme)}
        enableExperimentalMarginCollapsing={true}
      />
    </View>
  );
}
