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
      {/* Display Name Input */}
      <TextInput
        placeholder="Enter your display name"
        onChangeText={setDisplayName}
        value={displayName}
        autoCapitalize="none"
      />

      {/* Email Input */}
      <TextInput
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Create a unique password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      {/* Submit Button */}
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default SignUpScreen;