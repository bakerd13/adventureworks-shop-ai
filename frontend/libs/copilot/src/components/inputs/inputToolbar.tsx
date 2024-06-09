import React, { useEffect, useState } from 'react';
import { View, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { Composer, ComposerProps } from './composer';
import { Actions, ActionsProps } from '../actions';
import { styles } from './inputToolbar.styles';
import InputToolbarAccessory from './inputToolbaraccessory';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export interface InputToolbarProps {
  theme: ThemeEnum;
  options?: { [key: string]: object };
  optionTintColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  primaryStyle?: StyleProp<ViewStyle>;
  accessoryStyle?: StyleProp<ViewStyle>;
  customActions?(props: ActionsProps): React.ReactNode;
  onPressActionButton?(): void;
}

export const InputToolbar = (
  props: InputToolbarProps
) => {
  const [position, setPosition] = useState('absolute');
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setPosition('relative')
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setPosition('absolute')
    );
    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  const { containerStyle, ...rest } = props;
  const { customActions, onPressActionButton } = rest;

  return (
    <View
      style={
        [
          styles(props.theme).container,
          { position },
          containerStyle,
        ] as ViewStyle
      }
    >
      <View style={[styles(props.theme).primary, props.primaryStyle]}>
        {customActions?.(rest) ||
          (onPressActionButton && <Actions {...rest} />)}
        <Composer textInputStyle={styles(props.theme).composer} {...(props as ComposerProps)} />
        <InputToolbarAccessory containerStyle={styles(props.theme).accessories} {...props} />
      </View>
    </View>
  );
}
