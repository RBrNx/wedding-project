import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import ErrorAnimation from '../assets/animations/error.json';

const ErrorMessage = ({ message }) => {
  const errorMessage = message || 'Whoops, something has went wrong!';

  return (
    <View style={styles.container}>
      <LottieView source={ErrorAnimation} autoPlay loop={false} style={styles.animation} />
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 200,
    marginTop: -50,
  },
  text: {
    marginTop: -75,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ErrorMessage;
