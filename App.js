import React from 'react';
import { StyleSheet, View, Text, Pressable, Accessibility} from 'react-native';
import ICanSeeLogo from '../assets/iCANsee_logo_yellow.svg';

export default function App() {
  return (
    <View style={styles.container}>
      <ICanSeeLogo style={styles.logo}/>
      <Text style={styles.text}>iCANsee</Text>
      <View style={styles.buttonContainer}>
        <Pressable 
        style={[styles.button, styles.buttonVisualImpairment]} 
        accessible = {true}
        accessibilityLabel = "시각장애인 모드.">
          <Text style={styles.buttonText}>시각장애인</Text>
        </Pressable>
        <Pressable 
        style={[styles.button, styles.buttonNonVisualImpairment]}
        accessible = {true}
        accessibilityLabel = "비시각장애인 모드.">
          <Text style={styles.buttonText}>비시각장애인</Text>
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontSize: 24,
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
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonVisualImpairment: {
    backgroundColor: 'yellow',
  },
  buttonNonVisualImpairment: {
    backgroundColor: 'white',
  },
});
