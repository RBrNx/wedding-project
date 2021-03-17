import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import LottieView from 'lottie-react-native';
import SuccessAnimationFile from '../assets/animations/success.json';

const SuccessAnimation = ({ size, style }) => {
  const [opacity] = useState(new Animated.Value(0));

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
        <LottieView source={SuccessAnimationFile} autoPlay speed={1} loop={false} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SuccessAnimation;
