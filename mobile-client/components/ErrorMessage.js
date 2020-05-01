import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import ErrorAnimation from '../assets/animations/space.json';

const ErrorMessage = ({ message }) => {
  const { colors } = useTheme();
  const [opacity] = useState(new Animated.Value(0));
  const errorMessage = message || 'Whoops, something has went wrong!';

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <LottieView source={ErrorAnimation} autoPlay style={styles.animation} />
      <Text style={[styles.text, { color: colors.bodyText }]}>{errorMessage}</Text>
    </Animated.View>
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
  },
});

export default ErrorMessage;
