import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Alert,StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig.js';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SignInRequest } from '../redux/slices/AuthSlices.js';
import BackgroundImage from '../components/AppBackground.js';
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
/*

  const handleSignIn = () => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        navigation.navigate('GroupChat');
      })
      .catch((error) => {
        console.error('Error:', error.message);
        
      });
  };
*/
const handleSignIn = () => {
  // Dispatch the SignInRequest action with email and password
  console.log('Dispatching SignInRequest');
  dispatch(SignInRequest({ email, password }));
};
useEffect(() => {
    if (user) {
      
      navigation.navigate('GroupChat');
    }
  }, [user, navigation]);
  return (
    <BackgroundImage>
    <View>
      
      <TextInput
        style = {styles.input}
        placeholder="Enter your registered email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF" 
        color='#FFFFFF'
      />

      {/* Password Input */}
      <TextInput
        style = {styles.input}
        placeholder="Enter your registered password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide password text
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF" 
        color='#FFFFFF'
      />

      {/* Sign-In Button */}
      <Button 
      style = {styles.button}
      title="Sign In" 
      onPress={handleSignIn} />
      
    </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
export default SignInScreen;