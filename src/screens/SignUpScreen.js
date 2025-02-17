/*
import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app } from '../../firebaseConfig.js';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  // State for email, password, and display name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  // Sign-up function
  const signUp = () => {
    const auth = getAuth(app);

    // Step 1: Create the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);

        // Step 2: Update the user's profile with the display name
        return updateProfile(user, {
          displayName: displayName,
        });
      })
      .then(() => {
        console.log('Profile updated successfully!');
        // Step 3: Navigate to the GroupChat screen
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <View>
      
      <TextInput
        placeholder="Enter your display name"
        onChangeText={setDisplayName}
        value={displayName}
        autoCapitalize="none"
      />

     
      <TextInput
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

     
      <TextInput
        placeholder="Create a unique password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default SignUpScreen;
*/
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