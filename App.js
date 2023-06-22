import React from 'react';
import {StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screen/CameraScreen';
import HomeScreen from './screen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
