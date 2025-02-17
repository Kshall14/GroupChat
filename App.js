
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import GroupChatScreen from './src/screens/GroupChatScreen';
import MainMenuScreen from './src/screens/MainMenu';
import SignUpScreen from './src/screens/SignUpScreen';
import store from './src/redux/store'
import { Provider } from 'react-redux'; 
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ title: 'Group Chat' }} />
        <Stack.Screen name = 'MainMenu' component = {MainMenuScreen} options={{ title: 'MainMenu' }}/>
        <Stack.Screen name = 'SignUp' component = {SignUpScreen} options={{ title: 'Sign Up' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
