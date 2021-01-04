import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import EmptyAnimation from '../assets/animations/emptyBox.json';

const EmptyMessage = ({ message, size, style }) => {
  const { colors } = useTheme();
  const animation = useRef(null);
  const [opacity] = useState(new Animated.Value(0));
  const emptyMessage = message || "There doesn't seem to be anything here";

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const onAnimationFinish = () => {
    setTimeout(() => {
      if (animation?.current) animation.current.play();
    }, 3000);
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={[styles.container, { height: size || 50, width: size || 50 }, style]}>
        <LottieView
          ref={animation}
          source={EmptyAnimation}
          autoPlay
          speed={0.9}
          loop={false}
          onAnimationFinish={onAnimationFinish}
        />
      </View>
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
  text: {
    fontSize: 16,
    flex: 0.5,
  },
});

export default EmptyMessage;
