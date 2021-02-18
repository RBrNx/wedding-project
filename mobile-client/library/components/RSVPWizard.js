import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Screen = ({ screen, isPrev, isNext, position }) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    // eslint-disable-next-line no-nested-ternary
    const outputRange = isPrev ? [0, -width, -width] : isNext ? [width, width, 0] : [width, 0, -width];

    const translateX = interpolate(position.value, [-1, 0, 1], outputRange, Extrapolate.CLAMP);

    return {
      transform: [{ translateX }],
    };
  });

  return <Animated.View key={screen} style={[styles.screen, { backgroundColor: screen }, animatedContainerStyle]} />;
};

const RSVPWizard = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const screenPosition = useSharedValue(0);
  const screens = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
  const currScreen = screens[currIndex];
  const prevScreen = screens[currIndex - 1];
  const nextScreen = screens[currIndex + 1];

  useEffect(() => {
    screenPosition.value = 0;
  }, [currIndex]);

  const onPrev = () => {
    screenPosition.value = withTiming(-1, { duration: 300 }, () => {
      runOnJS(setCurrIndex)(currIndex - 1);
    });
  };

  const onNext = () => {
    screenPosition.value = withTiming(1, { duration: 300 }, () => {
      runOnJS(setCurrIndex)(currIndex + 1);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Screen screen={prevScreen} isPrev position={screenPosition} />
        <Screen screen={currScreen} position={screenPosition} />
        <Screen screen={nextScreen} isNext position={screenPosition} />
      </View>
      <Button title='Prev' onPress={onPrev} />
      <Button title='Next' onPress={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  screen: {
    width: '100%',
    height: 300,
    position: 'absolute',
  },
});

export default RSVPWizard;
