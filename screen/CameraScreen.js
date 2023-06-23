import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, SafeAreaView, Pressable} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import Tts from 'react-native-tts';

const { width, height } = Dimensions.get('window');

export function CameraScreen() {
  useEffect(() => {
    (async () => {
      const imagesDir = `${FileSystem.documentDirectory}images/`;
      await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
    })();
  }, []);

  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  let [serverResponse, setResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const uploadImage = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpg', // Adjust the image type accordingly
        name: 'myImage2.jpg', // Adjust the image name accordingly
      });

      
      const response = await axios.post('http://34.64.40.136:5000/upload', formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      );
      const prediction = response.data['prediction'];

      serverResponse = prediction
      // setResponse(prediction);
      console.log(serverResponse); // Access the updated state value here
      console.log('Image uploaded successfully'); 
      
      // Handle the response from the server after successful upload
    } catch (error) {
      console.log('Image upload failed', error);
      // Handle the error if the upload fails
    }
  };

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
      await uploadImage(newUri);

      console.log(serverResponse);
      navigation.navigate('Result', { response: serverResponse });
    }
  }
  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}
    accessible = {true}
    accessibilityLabel = "하단 중앙에 촬영 버튼이 있습니다. 버튼을 누른 후 한 15초 정도 기다려주세요.">
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
      <View style={styles.cameraButtonContainer}>
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

export function ResultScreen({navigation, route}) {
  const {response} = route.params;
  

  return (
    <View style={styles.container}>
      <View style={styles.resultbox}>
          <View>
          <Text style={styles.result} accessible = {true} accessibilityLabel = "테라 캔">
              {response}
          </Text>
          </View>
          
          
          <View style={styles.buttonContainer}>
          <Pressable 
          style={[styles.button0, styles.button1]} 
          onPress={() => navigation.navigate('Home')}
          accessible = {true}
          accessibilityLabel = "처음으로 돌아가기"
          >
          <Text style={styles.buttonText}>처음으로</Text>
          </Pressable>
          </View>
      </View>        
    </View>
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
  cameraButtonContainer: {
    flex: 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  cameraButton: {
    width: 80,
    height: 80,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white', // Set text color to white
  },
  resultbox:{
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
      color: 'white',
      fontSize: 20,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button0: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, // Increase the button width
    height: 80, // Increase the button height
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
  },
  button1: {
    backgroundColor: 'yellow',
  },
});