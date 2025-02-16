/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
/*
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig.js";

export default function App() {
    
    function signUp() {
        
        const auth = getAuth(app);

        createUserWithEmailAndPassword(
            auth,
            "jane.doe@example.com",
            "SuperSecretPassword!"
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Check For Firebase Integration!</Text>

                <TouchableOpacity style={styles.button_container} onPress={signUp}>
                <Text style={styles.button_text}>SignUp</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 48,
    },
    text: {
        fontWeight:"bold",
        textAlign:"center",
        fontSize:24,
    },
    button_text: {
        textAlign:"center",
        fontSize:24,
        color:"#1976d2"
    },
    button_container: {
        borderRadius: 15,
        flexDirection: "row",
        margin: 16,
        padding:24,
        justifyContent:"center",
        backgroundColor:"#e6e6e6"
    },
});
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import GroupChatScreen from './src/screens/GroupChatScreen';
import MainMenuScreen from './src/screens/MainMenu';
import SignUpScreen from './src/screens/SignUpScreen';
import { app } from "./firebaseConfig.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ title: 'Group Chat' }} />
        <Stack.Screen name = 'MainMenu' component = {MainMenuScreen} options={{ title: 'MainMenu' }}/>
        <Stack.Screen name = 'SignUp' component = {SignUpScreen} options={{ title: 'Sign Up' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
