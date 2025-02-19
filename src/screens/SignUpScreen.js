
import React, { useState,useEffect } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CreateUserRequest } from '../redux/slices/AuthSlices';
import BackgroundImage from '../components/AppBackground';
const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const signUp = () => {
    // Dispatch the CreateUserRequest action with user data and navigation
    dispatch(CreateUserRequest({ email, password, displayName, navigation }));
    
  };
  useEffect(() => {
    if (user) {
      // Navigate to the SignIn screen after successful sign-up
      navigation.navigate('SignIn');
    }
  }, [user, navigation]);
  return (
    <BackgroundImage>
    <View>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your display name"
        onChangeText={setDisplayName}
        value={displayName}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF" 
        color='#FFFFFF'
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF" 
        color='#FFFFFF'
      />
      <TextInput
      style={styles.input}
        placeholder="Create a unique password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF" 
        color='#FFFFFF'
      />
      <Button 
      style={styles.button}
      title="Sign Up" 
      onPress={signUp} 
      />
      
    </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;