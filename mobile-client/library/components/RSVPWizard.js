import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useAnimatedWizardV2 from '../hooks/useAnimatedWizardV2';

const { width } = Dimensions.get('window');

const Screen = ({ screen, animatedStyle, index }) => {
  return (
    <Animated.View key={screen} style={[styles.screen, { backgroundColor: screen }, animatedStyle]}>
      <Text style={{ fontSize: 24, color: '#fff' }}>{index}</Text>
    </Animated.View>
  );
};

const FormWizardV2 = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const steps = ['red', 'blue', 'green']; // 'yellow', 'pink', 'purple'

  const {
    moveToPrevStep,
    moveToNextStep,
    prevStepAnimatedStyle,
    currStepAnimatedStyle,
    nextStepAnimatedStyle,
  } = useAnimatedWizardV2({ currStep: currIndex });

  const onPrev = () => {
    moveToPrevStep(() => setCurrIndex(currIndex - 1));
  };

  const onNext = () => {
    moveToNextStep(() => setCurrIndex(currIndex + 1));
  };

  return (
    <>
      <View style={styles.container}>
        <Screen screen={steps[currIndex - 1]} isPrev animatedStyle={prevStepAnimatedStyle} />
        <Screen screen={steps[currIndex]} animatedStyle={currStepAnimatedStyle} />
        <Screen screen={steps[currIndex + 1]} isNext animatedStyle={nextStepAnimatedStyle} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormWizardV2;
