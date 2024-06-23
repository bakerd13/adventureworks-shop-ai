import { Dimensions, StyleSheet } from 'react-native';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

const { height } = Dimensions.get('window');

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    height: height,
    backgroundColor: Theme[theme].backgroundColor,
  },
  cardGrid: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
  },
});
