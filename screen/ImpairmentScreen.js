import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function ImpairmentScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log('Photo', photo);
      // 여기에서 사진을 처리하거나 저장하는 로직을 추가할 수 있습니다.
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_text.png')} style={styles.logo} />
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => setCameraRef(ref)} />
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>사진 찍기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});