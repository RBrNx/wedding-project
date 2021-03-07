import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Assets } from '@react-navigation/stack';

const BackButtonImage = ({ style }) => {
  return <Image source={Assets[0]} fadeDuration={0} style={[styles.backImage, style]} />;
};

const styles = StyleSheet.create({
  backImage: {
    tintColor: '#fff',
  },
});

export default BackButtonImage;
