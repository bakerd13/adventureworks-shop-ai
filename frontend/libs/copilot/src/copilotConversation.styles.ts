import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';

export const styles = (theme: ThemeEnum) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme[theme].backgroundColor,
    },
    wrapper: {
      flex: 1,
    },
  });
