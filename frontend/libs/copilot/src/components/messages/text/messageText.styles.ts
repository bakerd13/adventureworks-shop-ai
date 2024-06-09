import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { StyleSheet } from 'react-native';

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
});

export const styles = {
  center: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    text: {
      color: Theme[theme].fontColor,
      ...textStyle,
    },
    link: {
      color: Theme[theme].fontColor,
      textDecorationLine: 'underline',
    },
    image: {
      width: 50,
      height: 50,
      marginLeft: 5,
      marginTop: 5,
    },
  }),
  left: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
    image: {
      width: 50,
      height: 50,
      marginLeft: 10,
      marginTop: 5,
    },
  }),
  right: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
    image: {
      width: 50,
      height: 50,
      marginLeft: 10,
      marginTop: 5,
    }
  }),

}
