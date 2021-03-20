/* eslint-disable camelcase */
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
import { StyleSheet } from 'react-native';
import { useFonts, Muli_400Regular, Muli_700Bold } from '@expo-google-fonts/muli';
import { useAuth, useSettings } from '../context';

const AnimatedSplashScreen = ({ children, splashImage }) => {
  const animation = useSharedValue(0);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const [fontsLoaded] = useFonts({ Muli_400Regular, Muli_700Bold });
  const { bootstrapComplete: authBootstrapped } = useAuth();
  const { bootstrapComplete: settingsBootstrapped } = useSettings();
  const isAppReady = fontsLoaded && authBootstrapped && settingsBootstrapped;

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
      animation.value = withTiming(1, { duration: 200 }, () => runOnJS(setAnimationComplete)(true));
    }
  }, [isAppReady]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animation.value, [0, 1], [1, 0], Extrapolate.CLAMP);

    return {
      opacity,
    };
  });

  const animatedSplashStyle = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [0, 1], [1, 0], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
    };
  });

  return (
    <>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View pointerEvents='none' style={[styles.container, animatedContainerStyle]}>
          <Animated.Image style={[styles.splash, animatedSplashStyle]} source={splashImage} fadeDuration={0} />
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Constants.manifest.splash.backgroundColor,
  },
  splash: {
    width: '100%',
    height: '100%',
    resizeMode: Constants.manifest.splash.resizeMode || 'contain',
  },
});

export default AnimatedSplashScreen;
