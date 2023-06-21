import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen components
import ImpairmentScreen from './screen/ImpairmentScreen';
import NoImpairmentScreen from './screen/NoImpairmentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Impairment" component={ImpairmentScreen} />
        <Stack.Screen name="NoImpairment" component={NoImpairmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>iCANsee</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonVisualImpairment]}
          onPress={() => navigation.navigate('Impairment')}
        >
          <Text style={styles.buttonText}>시각장애인</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonNonVisualImpairment]}
          onPress={() => navigation.navigate('NoImpairment')}
        >
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
