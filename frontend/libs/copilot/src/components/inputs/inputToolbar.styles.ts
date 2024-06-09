import { StyleSheet } from 'react-native';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    backgroundColor: Theme[theme].backgroundColor,
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 5,
  },
  primary: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme[theme].textboxColor,
    borderColor: Theme[theme].borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 5,
    borderRadius: 10,
  },
  composer: {
    flex: 0.9,
  },
  accessories: {
    flex: 0.1,
  },
});
