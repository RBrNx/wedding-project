import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Typography } from '../styles';

const RSVPQuestion = ({ question, animIndex, index }) => {
  const animatedStepStyle = useAnimatedStyle(() => {
    const normalisedAnim = index - animIndex.value;
    const opacity = interpolate(normalisedAnim, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);
    const translateX = interpolate(normalisedAnim, [-0.5, 0, 0.5], [-15, 0, 15], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <Container style={animatedStepStyle}>
      <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
      <QuestionTitle>{question.title}</QuestionTitle>
    </Container>
  );
};

const Container = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 300px;
  padding-left: 5%;
  padding-right: 15%;
  padding-bottom: 30px;
  justify-content: flex-end;
`;

const QuestionNumber = styled.Text`
  ${Typography.h1};
  font-family: 'Muli_400Regular';
  color: ${Colours.secondary};
`;

const QuestionTitle = styled.Text`
  ${Typography.h1};
  font-family: 'Muli_400Regular';
  color: ${Colours.neutral.white};
`;

export default RSVPQuestion;
