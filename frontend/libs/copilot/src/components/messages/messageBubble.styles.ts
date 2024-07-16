import { StyleSheet } from 'react-native';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = {
  center: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      width: '100%',
      marginRight: 60,
      marginBottom: 10,
      minHeight: 20,
      justifyContent: 'flex-start',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    footer: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: 5,
    },
  }),
  left: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderColor: Theme[theme].borderColor,
      borderWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      marginRight: 60,
      marginBottom: 10,
      padding: 10,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    footer: {
      flexDirection: 'row',
      marginVertical: 5,
    },
  }),
  right: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderColor: Theme[theme].borderColor,
      borderWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      marginLeft: 60,
      marginBottom: 10,
      padding: 10,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    footer: {
      flexDirection: 'row',
      marginVertical: 5,
    },
  }),
  content: StyleSheet.create({
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: '#aaa',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
};
