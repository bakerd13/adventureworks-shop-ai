import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TEST_ID } from '../../constants';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { MessageDTO } from '../../types/messages';
import { InputToolbarAccessoryProps } from './inputToolbaraccessory';

export const Send = ({
  theme = ThemeEnum.Light,
  text = '',
  containerStyle,
  children,
  sendButtonProps,
  onSend = () => {},
}: InputToolbarAccessoryProps) => {
  const handleOnPress = useCallback(() => {
    if (text && onSend) {
      onSend({ content: text.trim() } as Partial<MessageDTO>, true);
    }
  }, [text, onSend]);

  return (
    <Pressable
      testID={TEST_ID.SEND_TOUCHABLE}
      accessible
      accessibilityLabel="send"
      style={[containerStyle]}
      onPress={handleOnPress}
      accessibilityRole="button"
      {...sendButtonProps}
    >
      <View>
        {children || <Feather name="send" size={16} color={Theme[theme].iconColor} />}
      </View>
    </Pressable>
  );
};
