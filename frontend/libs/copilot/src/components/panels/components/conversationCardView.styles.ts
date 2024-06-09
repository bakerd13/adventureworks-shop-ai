import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: 300,
    minHeight: 200,
    margin: 16,
    borderRadius: 5,
    borderColor: Theme[theme].borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: Theme[theme].cardBackgroundColor,
  },
  title: {
    width: '100%',
    color: Theme[theme].fontColor,
    padding: 16,
    fontSize: 16,
    flexWrap: 'wrap',
  },
  infoWrapper: {
    paddingBottom: 16,
    alignItems: 'flex-start',
  },
  buttonWrapper: {
    paddingBottom: 16,
    alignItems: 'flex-end',
  },
  infoSummary: {
    flexDirection: 'row',
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
 
  padding16: {
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
  },
});
