import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useRef } from 'react';
import { Button, StyleSheet, Text, Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useCopilotCameraStore from '../../stores/copilotCameraStore';
import { ICopilotCameraStore } from '../../types/copilotCameraStoreType';

import { styles } from './camera.styles';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

const Camera = ({ theme }: {theme: ThemeEnum}) => {
  const camera = useRef<CameraView>(null);
  const { facing, pin, picture, setFacing, setPin, setPicture } = useCopilotCameraStore<ICopilotCameraStore>(state => state);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles(theme).container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setFacing();
  }

  function togglePin() {
    setPicture(null);
    setPin();
  }

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      setPicture(photo?.uri);
      setPin();
    }
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).cameraContainer}>
        <View style={styles(theme).camera}>
          {!picture ? (
            <CameraView style={StyleSheet.absoluteFillObject} ref={camera} facing={facing} />
          ) : (
            <Image
              style={StyleSheet.absoluteFillObject}
              source={{ uri: picture }}
              contentFit="cover"
              transition={1000}
            />
          )}
        </View>
        <View style={styles(theme).toolContainer}>
          <Pressable style={styles(theme).button} onPress={takePicture} disabled={pin}>
            <MaterialIcons name={'camera-roll'} size={24} color={Theme[theme].iconColor} />
          </Pressable>
          <Pressable style={styles(theme).button} onPress={togglePin} disabled={!pin}>
            <MaterialIcons
              name={pin ? 'pin-end' : 'pin-invoke'}
              size={24}
              color={Theme[theme].iconColor}
            />
          </Pressable>
          <Pressable style={styles(theme).button} onPress={toggleCameraType}>
            <MaterialIcons
              name={facing === 'back' ? 'camera-rear' : 'camera-front'}
              size={24}
              color={Theme[theme].iconColor}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};



export default Camera;
