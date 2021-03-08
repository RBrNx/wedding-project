import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

const RSVPQuestion = ({ question, animIndex, index }) => {
  const normalisedAnim = useDerivedValue(() => {
    return index - animIndex.value;
  });

  const animatedStepStyle = useAnimatedStyle(() => {
    const opacity = interpolate(normalisedAnim.value, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);
    const translateX = interpolate(normalisedAnim.value, [-0.5, 0, 0.5], [-15, 0, 15], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStepStyle]}>
      <Text style={styles.questionNumber}>{`Q${index + 1}`}</Text>
      <Text style={styles.questionTitle}>{question.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: '5%',
    paddingRight: '15%',
    paddingBottom: 30,
    height: 300,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
  questionNumber: {
    fontSize: 30,
    color: '#2991cc',
  },
  questionTitle: {
    fontSize: 30,
    color: '#fff',
  },
});

export default RSVPQuestion;
