import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import BackgroundImage from '../components/AppBackground';

const MainMenuScreen = () => {
  // Get the navigation object
  const navigation = useNavigation();

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={styles.title}>ChatZone</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')} // Navigate to SignUpScreen
            style={styles.button}
          />
          <View style={styles.spacer} />
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')} // Navigate to SignInScreen
            style={styles.button}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
   
  },
  buttonContainer: {
    justifyContent: 'space-around',
    height: 200,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 20,
  },
});

export default MainMenuScreen;