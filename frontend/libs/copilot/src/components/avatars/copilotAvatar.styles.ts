import { Colors } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarTransparent: {
    backgroundColor: Colors.backgroundTransparent,
  },
  textStyle: {
    color: Colors.white,
    fontSize: 16,
    backgroundColor: Colors.backgroundTransparent,
    fontWeight: '100',
  },
});
