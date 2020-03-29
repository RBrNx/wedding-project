import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import ErrorAnimation from '../assets/animations/space.json';

const ErrorMessage = ({ message }) => {
  const errorMessage = message || 'Whoops, something has went wrong!';

  return (
    <View style={styles.container}>
      <LottieView source={ErrorAnimation} autoPlay style={styles.animation} />
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
    height: 150,
    marginTop: -35,
  },
  text: {
    marginTop: -25,
    textAlign: 'center',
    fontSize: 16,
    color: '#8C8C8C',
  },
});

export default ErrorMessage;
