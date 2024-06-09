import { StyleSheet } from 'react-native';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});
