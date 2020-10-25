import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import LoadingAnimation from '../assets/animations/loading.json';

const LoadingIndicator = () => (
  <LottieView source={LoadingAnimation} autoPlay loop style={styles.animation} speed={0.75} />
);

const styles = StyleSheet.create({
  animation: {
    marginTop: -30,
  },
});

export default LoadingIndicator;
