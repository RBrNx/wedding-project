import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Assets } from '@react-navigation/stack';

const BackButtonImage = () => {
  return <Image source={Assets[0]} fadeDuration={0} style={styles.backImage} />;
};

const styles = StyleSheet.create({
  backImage: {
    tintColor: '#fff',
    transform: [{ rotate: '180deg' }],
  },
});

export default BackButtonImage;
