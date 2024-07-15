import { Dimensions, StyleSheet } from 'react-native';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

const { height } = Dimensions.get('window');

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    height: height,
    width: '100%',
    backgroundColor: Theme[theme].backgroundColor,
  },
  settingsContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 100,
    margin: 16,
    borderRadius: 5,
    borderColor: Theme[theme].borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: Theme[theme].cardBackgroundColor,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
    flexShrink: 1,
    width: '100%',
  },
  title: {
    width: '100%',
    color: Theme[theme].cardFontColor,
    padding: 16,
    fontSize: 16,
    flexWrap: 'wrap',
  },
  switchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 'auto',
    margin: 20,
  },
  switch: {
    transform:[{ scaleX: 1.0 }, { scaleY: 1.0 }]
  },
});
