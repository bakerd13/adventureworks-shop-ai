import { StyleSheet } from 'react-native';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = {
  center: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    messageContainer: {
      flexDirection: 'row',
      width: '85%',
      alignItems: 'flex-start',
      padding: 5,
    },
    assistantUser: {
      backgroundColor: Theme[theme].assistantBackgroundColor,
    },
  }),
  left: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
     messageContainer: {
      flexDirection: 'row',
     },
     assistantUser: {
      backgroundColor: Theme[theme].assistantBackgroundColor,
    },
  }),
  right: (theme: ThemeEnum) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
    messageContainer: {
      flexDirection: 'row',
    },
    assistantUser: {
      backgroundColor: Theme[theme].assistantBackgroundColor,
    },
  }),
}
