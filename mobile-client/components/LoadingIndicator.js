import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import LoadingAnimation from '../assets/animations/loading.json';

const LoadingIndicator = ({ size, style }) => (
  <View style={[styles.container, { height: size || 50, width: size || 50 }, style]}>
    <LottieView source={LoadingAnimation} autoPlay loop speed={0.75} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
