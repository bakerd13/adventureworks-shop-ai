import React, { useRef, useCallback } from 'react';
import {
  Platform,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from '../../constants';
import { Colors } from '@adventureworks.shop.ai.ui';
import { styles } from './composer.styles';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export interface ComposerProps {
  theme: ThemeEnum;
  composerHeight?: number;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  textInputProps?: Partial<TextInputProps>;
  textInputStyle?: StyleProp<ViewStyle>;
  textInputAutoFocus?: boolean;
  keyboardAppearance?: TextInputProps['keyboardAppearance'];
  multiline?: boolean;
  disableComposer?: boolean;
  onTextChanged?(text: string): void;
  onInputSizeChanged?(layout: { width: number; height: number }): void;
}

export const Composer = ({
  theme = ThemeEnum.Light,
  composerHeight = MIN_COMPOSER_HEIGHT,
  disableComposer = false,
  keyboardAppearance = 'default',
  multiline = true,
  onInputSizeChanged = () => {},
  onTextChanged = () => {},
  placeholder = DEFAULT_PLACEHOLDER,
  placeholderTextColor = Colors.defaultColor,
  text = '',
  textInputAutoFocus = false,
  textInputProps = {},
  textInputStyle,
}: ComposerProps): React.ReactElement => {
  const dimensionsRef = useRef<{ width: number; height: number }>();

  const determineInputSizeChange = useCallback(
    (dimensions: { width: number; height: number }) => {
      // Support earlier versions of React Native on Android.
      if (!dimensions) {
        return;
      }

      if (
        !dimensionsRef ||
        !dimensionsRef.current ||
        (dimensionsRef.current &&
          (dimensionsRef.current.width !== dimensions.width ||
            dimensionsRef.current.height !== dimensions.height))
      ) {
        dimensionsRef.current = dimensions;
        onInputSizeChanged(dimensions);
      }
    },
    [onInputSizeChanged]
  );

  const handleContentSizeChange = ({
    nativeEvent: { contentSize },
  }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) =>
    determineInputSizeChange(contentSize);

  return (
    <TextInput
      testID={placeholder}
      accessible
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      multiline={multiline}
      editable={!disableComposer}
      onContentSizeChange={handleContentSizeChange}
      onChangeText={onTextChanged}
      style={[
        styles(theme).textInput,
        textInputStyle,
        {
          height: composerHeight,
          ...Platform.select({
            web: {
              outlineWidth: 0,
              outlineColor: 'transparent',
              outlineOffset: 0,
            },
          }),
        },
      ]}
      autoFocus={textInputAutoFocus}
      value={text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      {...textInputProps}
    />
  );
}
