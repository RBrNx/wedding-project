import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import EmptyAnimation from '../assets/animations/moon.json';

const EmptyMessage = ({ message }) => {
  const { colors } = useTheme();
  const [opacity] = useState(new Animated.Value(0));
  const emptyMessage = message || "There doesn't seem to be anything here";

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <LottieView source={EmptyAnimation} autoPlay style={styles.animation} speed={0.65} />
      <Text style={[styles.text, { color: colors.bodyText }]}>{emptyMessage}</Text>
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
    marginTop: -50,
  },
  text: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default EmptyMessage;
