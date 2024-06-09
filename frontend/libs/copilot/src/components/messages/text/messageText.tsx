import {
  Linking,
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Image } from 'expo-image';
import ParsedText from 'react-native-parsed-text';
import { LeftRightCenterStyle } from '../../../types/models';
import { useCopilotContext } from '../../../contexts/copilotContext';
import { error } from '../../../utils/logging';
import { MessageDTO } from '../../../types/messages';
import { Position, PositionEnum } from '../../../types/messageProps';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

import { styles } from './messageText.styles';

const WWW_URL_PATTERN = /^www\./i;

const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel'];

export interface MessageTextProps {
  theme: ThemeEnum;
  position?: Position;
  optionTitles?: string[];
  currentMessage?: MessageDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  textStyle?: LeftRightCenterStyle<TextStyle>;
  linkStyle?: LeftRightCenterStyle<TextStyle>;
  textProps?: TextProps;
  customTextStyle?: StyleProp<TextStyle>;
}

export const MessageText = ({
  theme = ThemeEnum.Light,
  currentMessage = {} as MessageDTO,
  optionTitles = DEFAULT_OPTION_TITLES,
  position = PositionEnum.Left,
  containerStyle,
  textStyle,
  linkStyle: linkStyleProp,
  customTextStyle,
  textProps,
}: MessageTextProps) => {
  const { actionSheet } = useCopilotContext();

  const onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      onUrlPress(`https://${url}`);
    } else {
      Linking.openURL(url).catch((e) => {
        error(e, 'No handler for URL:', url);
      });
    }
  };

  const onPhonePress = (phone: string) => {
    const options =
      optionTitles && optionTitles.length > 0
        ? optionTitles.slice(0, 3)
        : DEFAULT_OPTION_TITLES;
    const cancelButtonIndex = options.length - 1;
    actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            Linking.openURL(`tel:${phone}`).catch((e) => {
              error(e, 'No handler for telephone');
            });
            break;
          case 1:
            Linking.openURL(`sms:${phone}`).catch((e) => {
              error(e, 'No handler for text');
            });
            break;
          default:
            break;
        }
      }
    );
  };

  const onEmailPress = (email: string) =>
    Linking.openURL(`mailto:${email}`).catch((e) =>
      error(e, 'No handler for mailto')
    );

  const linkStyle = [
    styles[position](theme).link,
    linkStyleProp && linkStyleProp[position],
  ];
  return (
    <View
      style={[
        styles[position](theme).container,
        containerStyle && containerStyle[position],
      ]}
    >
      {currentMessage?.image && (
        <View>
          <Image
            style={[styles[position](theme).image]}
            source={{ uri: currentMessage.image }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      )}
      <View>
        <ParsedText
          style={[
            styles[position](theme).text,
            textStyle && textStyle[position],
            customTextStyle,
          ]}
          parse={[
            { type: 'url', style: linkStyle, onPress: onUrlPress },
            { type: 'phone', style: linkStyle, onPress: onPhonePress },
            { type: 'email', style: linkStyle, onPress: onEmailPress },
          ]}
          childrenProps={{ ...textProps }}
        >
          {currentMessage!.content}
        </ParsedText>
      </View>
    </View>
  );
}
