import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig.js';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

  return (
    <View>
      {/* Email Input */}
      <TextInput
        placeholder="Enter your registered email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Enter your registered password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide password text
        autoCapitalize="none"
      />

      {/* Sign-In Button */}
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignInScreen;