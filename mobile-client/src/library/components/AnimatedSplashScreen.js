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
import styled from 'styled-components/native';
import { Colours, Layout } from 'library/styles';
import LoadingIndicator from './LoadingIndicator';
import Spacer from './Spacer';

const AnimatedSplashScreen = ({ children, splashImage, isAppReady, loadingMessage }) => {
  const splashVisible = useSharedValue(1);
  const loaderVisible = useSharedValue(0);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      splashVisible.value = withTiming(0, { duration: 500 }, () => runOnJS(setAnimationComplete)(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  useEffect(() => {
    loaderVisible.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashVisible.value, [1, 0], [1, 0], Extrapolate.CLAMP),
  }));

  const animatedSplashStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(splashVisible.value, [1, 0], [1, 0], Extrapolate.CLAMP) }],
  }));

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(loaderVisible.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Container pointerEvents='none' style={animatedContainerStyle}>
          <SplashImage style={animatedSplashStyle} source={splashImage} fadeDuration={0} />
          <LoadingContainer style={animatedLoaderStyle}>
            <LoadingIndicator size={50} backgroundColour='#a2a2a2' />
            <Spacer size={15} />
            <SplashText>{loadingMessage}</SplashText>
          </LoadingContainer>
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

const LoadingContainer = styled(Animated.View)`
  position: absolute;
  bottom: 15%;
  width: 100%;
  ${Layout.flexCenter};
`;

const SplashText = styled.Text`
  font-size: 24px;
  color: ${Colours.neutral.white};
`;

export default AnimatedSplashScreen;
