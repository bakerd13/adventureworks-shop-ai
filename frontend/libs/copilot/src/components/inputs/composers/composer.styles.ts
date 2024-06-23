import { StyleSheet, Platform } from "react-native";
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: Theme[theme].textboxColor,
    marginLeft: 10,
    fontSize: 16,
    color: Theme[theme].fontColor,
    lineHeight: 16,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
});
