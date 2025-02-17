// BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/AppBackground.jpg')}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  }
});

export default BackgroundImage;