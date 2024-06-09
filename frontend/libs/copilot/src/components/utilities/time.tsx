import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '../../constants';
import { LeftRightCenterStyle } from '../../types/models';
import { useCopilotContext } from '../../contexts/copilotContext';
import { Position, PositionEnum } from '../../types/messageProps';
import { MessageDTO } from '../../types/messages';
import { Colors } from '@adventureworks.shop.ai.ui';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
});
const { textStyle } = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

const styles = {
  center: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Colors.timeTextColor,
      ...textStyle,
    },
  }),
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Colors.timeTextColor,
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Colors.timeTextColor,
      ...textStyle,
    },
  }),
};

export interface TimeProps<TMessage extends MessageDTO> {
  position?: Position;
  currentMessage?: TMessage;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
  timeTextStyle?: LeftRightCenterStyle<TextStyle>;
  timeFormat?: string;
}

export function Time<TMessage extends MessageDTO = MessageDTO>({
  position = PositionEnum.Left,
  containerStyle,
  currentMessage,
  timeFormat = TIME_FORMAT,
  timeTextStyle,
}: TimeProps<TMessage>) {
  const { getLocale } = useCopilotContext();
  if (currentMessage == null) {
    return null;
  }

  return (
    <View
      style={[
        styles[position].container,
        containerStyle && containerStyle[position],
      ]}
    >
      <Text
        style={[
          styles[position].text,
          timeTextStyle && timeTextStyle[position],
        ]}
      >
        {dayjs(currentMessage.createdAt).locale(getLocale()).format(timeFormat)}
      </Text>
    </View>
  );
}
