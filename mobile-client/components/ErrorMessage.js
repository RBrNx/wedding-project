import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import ErrorAnimation from '../assets/animations/error.json';

const ErrorMessage = ({ message, size, style }) => {
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
      <View style={[styles.container, { height: size || 50, width: size || 50 }, style]}>
        <LottieView source={ErrorAnimation} autoPlay speed={1} loop={false} />
      </View>
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
  text: {
    textAlign: 'center',
    fontSize: 16,
    flex: 0.5,
  },
});

export default ErrorMessage;
