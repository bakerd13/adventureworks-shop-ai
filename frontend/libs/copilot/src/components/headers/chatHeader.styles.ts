import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: Theme[theme].borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Theme[theme].headerBarColor,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
