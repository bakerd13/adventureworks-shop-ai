import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './camera.styles';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import useCopilotCameraStore from '../../stores/copilotCameraStore';
import { ICopilotCameraStore } from '../../types/copilotCameraStoreType';

const Camera = ({ theme }: {theme: ThemeEnum}) => {
  const { facing, setFacing } = useCopilotCameraStore<ICopilotCameraStore>(state => state);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles(theme).container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setFacing();
  }

  return (
    <View style={styles(theme).container}>
      <CameraView style={styles(theme).camera} facing={facing}>
        <View>
          <TouchableOpacity style={styles(theme).button} onPress={toggleCameraType}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default Camera;
