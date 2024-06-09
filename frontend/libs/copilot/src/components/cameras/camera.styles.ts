import { StyleSheet } from 'react-native';
import { Colors } from '@adventureworks.shop.ai.ui';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export const styles = (theme: ThemeEnum) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '50%',
    borderColor: Colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  camera: {
    width: '100%',
    height: 350,
  },
  toolContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderColor: Colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
  button: {
    margin: 5,
  },
});
