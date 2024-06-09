import { StyleSheet } from 'react-native';
import { Colors } from '@adventureworks.shop.ai.ui';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme[theme].backgroundColor,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  emptyChatContainer: {
    flex: 1,
  },
  headerWrapper: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
  },
  scrollToBottomStyle: {
    opacity: 0.8,
    position: 'absolute',
    right: 10,
    bottom: 30,
    zIndex: 999,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
  },
});
