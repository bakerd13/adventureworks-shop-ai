import React, { ReactNode, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useCopilotContext } from '../contexts/copilotContext';
import { Colors } from '@adventureworks.shop.ai.ui';

export interface ActionsProps {
  options?: { [key: string]: any };
  optionTintColor?: string;
  icon?: () => ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  iconTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPressActionButton?(): void;
}

export function Actions({
  options = {},
  optionTintColor = Colors.optionTintColor,
  icon,
  wrapperStyle,
  iconTextStyle,
  onPressActionButton,
  containerStyle,
}: ActionsProps) {
  const { actionSheet } = useCopilotContext();
  const onActionsPress = useCallback(() => {
    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');
    actionSheet().showActionSheetWithOptions(
      {
        options: optionKeys,
        cancelButtonIndex,
        tintColor: optionTintColor,
      },
      (buttonIndex: number) => {
        const key = optionKeys[buttonIndex];
        if (key) {
          options[key]();
        }
      }
    );
  }, []);

  const renderIcon = useCallback(() => {
    if (icon) {
      return icon();
    }
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPressActionButton || onActionsPress}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: Colors.defaultColor,
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: Colors.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: Colors.backgroundTransparent,
    textAlign: 'center',
  },
});
