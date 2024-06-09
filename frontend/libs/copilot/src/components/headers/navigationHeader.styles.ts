import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';
import { MIN_HEADER_HEIGHT } from '../../constants';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: MIN_HEADER_HEIGHT,
    borderBottomColor: Theme[theme].borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Theme[theme].headerBarColor,
  },
  buttonsContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 'auto',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme[theme].fontColor,
  },
});
