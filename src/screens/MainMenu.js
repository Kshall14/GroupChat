import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const MainMenuScreen = () => {
  // Get the navigation object
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')} // Navigate to SignUpScreen
      />
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')} // Navigate to SignInScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainMenuScreen;