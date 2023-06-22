import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable,  TextInput, Button} from 'react-native';

// export function TempOutput({navigation, route}) {  
//     const [stringInput, setStringInput] = useState('Something');  
//     const {imageUri} = route.params;

//     const handleButtonPress = () => {
//         navigation.navigate('Result', { result: stringInput });
//     };

//     return (
//         <View style={styles.container}>
//           <Image source={{uri:imageUri}} style={{width:200, height:200}}></Image>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter"
//             onChangeText={newText => setStringInput(newText)}
//             value = {stringInput}
//           />
//           <Button title="Submit" onPress={handleButtonPress} />
//         </View>
//       );
//     }


export default function ResultScreen({navigation, route}) {
    const {response} = route.params;
  
    return (
      <View style={styles.container}>
        <View style={styles.resultbox}>
            <View>
            <Text style={styles.result}
            accessible = {true}>
                {response}
            </Text>
            </View>
            
            <View style={styles.buttonContainer}>
            <Pressable 
            style={[styles.button, styles.button0]} 
            onPress={() => navigation.navigate('Home')}
            accessible = {true}
            accessibilityLabel = "처음으로 돌아가기">
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
})

