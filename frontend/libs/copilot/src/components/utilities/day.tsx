import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
} from 'react-native';
import dayjs from 'dayjs';

import { isSameDay } from '../../utils';
import { DATE_FORMAT } from '../../constants';
import { Colors } from '@adventureworks.shop.ai.ui';
import { useCopilotContext } from '../../contexts/copilotContext';
import { MessageDTO } from '../../types/messages';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Colors.backgroundTransparent,
    color: Colors.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

export interface DayProps {
  currentMessage?: MessageDTO;
  nextMessage?: MessageDTO;
  previousMessage?: MessageDTO;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  dateFormat?: string;
}

export const Day = ({
  dateFormat = DATE_FORMAT,
  currentMessage,
  previousMessage,
  containerStyle,
  wrapperStyle,
  textStyle,
}: DayProps) => {
  const { getLocale } = useCopilotContext();

  if (currentMessage == null || isSameDay(currentMessage, previousMessage)) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={wrapperStyle}>
        <Text style={[styles.text, textStyle]}>
          {dayjs(currentMessage.createdAt)
            .locale(getLocale())
            .format(dateFormat)}
        </Text>
      </View>
    </View>
  );
}
