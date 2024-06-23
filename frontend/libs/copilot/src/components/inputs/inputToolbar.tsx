import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { Composer, ComposerProps } from './composers/composer';
import { Actions, ActionsProps } from '../actions';
import { styles } from './inputToolbar.styles';
import InputToolbarAccessory from './inputToolbaraccessory';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import useCopilotAccessoryStore from '../../stores/copilotAccessoryStore';
import AudioComposer from './audios/audioComposer';

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

export interface ComposerProps {
  microphoneState: boolean;
}

export const InputToolbar = (
  props: InputToolbarProps
) => {
  const [position, setPosition] = useState('absolute');
  const microphoneState = useCopilotAccessoryStore<boolean>((state) => state.microphoneState);

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
          <Composer microphoneState={microphoneState} textInputStyle={styles(props.theme).composer} {...(props as ComposerProps)} />
          <AudioComposer microphoneState={microphoneState} />
        <InputToolbarAccessory containerStyle={styles(props.theme).accessories} {...props} />
      </View>
    </View>
  );
}
