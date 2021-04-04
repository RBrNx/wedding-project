import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Spacer from '../library/components/Spacer';

const { height } = Dimensions.get('window');

const ScannerHeading = ({ heading, subHeading, scannerModeIndex, index }) => {
  const animatedHeadingStyle = useAnimatedStyle(() => {
    const normalisedAnim = index - scannerModeIndex.value;

    const opacity = interpolate(normalisedAnim, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.textContainer, animatedHeadingStyle]}>
      <Text style={styles.heading}>{heading}</Text>
      <Spacer size={15} />
      <Text style={styles.subHeading}>{subHeading}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    top: height * 0.15,
    position: 'absolute',
    width: '100%',
  },
  heading: {
    fontFamily: 'Muli_700Bold',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: '5%',
    fontFamily: 'Muli_400Regular',
  },
});

export default ScannerHeading;
