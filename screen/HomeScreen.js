import React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
        <Image source={require('../assets/logo_text.png')} style={styles.textlogo} />
      
      <View style={styles.buttonContainer}>
        <Pressable 
        style={[styles.button, styles.button0]} 
        onPress={() => navigation.navigate('Camera')}
        accessible = {true}
        accessibilityLabel = "카메라에 접속해 사진찍기">
          <Text style={styles.buttonText}>시작</Text>
        </Pressable>
      </View>
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
    logoContainer:{
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    textlogo: {
      width: 150,
      resizeMode: 'contain',
      
    },
    buttonContainer: {
      marginTop: 30,
      flexDirection: 'row',
    },
    button: {
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
    button0: {
      backgroundColor: 'yellow',
    },
  });
export default HomeScreen;