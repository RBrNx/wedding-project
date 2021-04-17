import React, { useEffect, useState } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components/native';
import { Layout } from '../styles';

const AnimatedSplashScreen = ({ children, splashImage, isAppReady }) => {
  const animation = useSharedValue(0);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
      animation.value = withTiming(1, { duration: 200 }, () => runOnJS(setAnimationComplete)(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  }));

  const animatedSplashStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(animation.value, [0, 1], [1, 0], Extrapolate.CLAMP) }],
  }));

  return (
    <>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Container pointerEvents='none' style={animatedContainerStyle}>
          <SplashImage style={animatedSplashStyle} source={splashImage} fadeDuration={0} />
        </Container>
      )}
    </>
  );
};

const Container = styled(Animated.View)`
  ${Layout.absoluteFill};
  background-color: ${Constants.manifest.splash.backgroundColor};
`;

const SplashImage = styled(Animated.Image)`
  width: 100%;
  height: 100%;
  resize-mode: ${Constants.manifest.splash.resizeMode || 'contain'};
`;

export default AnimatedSplashScreen;
