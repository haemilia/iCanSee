import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const navigation = useNavigation();

function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);


  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const newUri = `${FileSystem.documentDirectory}images/${filename}`;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });
      setImage(newUri);
      navigation.navigate('Output');
    }
  }
  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../assets/logo_text.png')} style={styles.textLogo} />
      </View>
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={takePicture}
          accessible = {true}
          accessibilityLabel = "촬영 버튼">
          <Image source={require('../assets/Camera_Action_Button.png')} style={styles.cameraButton} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textLogo: {
    height: '70%',
    resizeMode: 'contain',
  },
  cameraContainer: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: width,
    height: height,
    flex: 1,
  },
  buttonContainer: {
    flex: 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  cameraButton: {
    width: 80,
    height: 80,
  }
});

export default CameraScreen;