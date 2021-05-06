import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { SubmitRSVP } from 'library/utils/constants';
import { Colours, Typography } from 'library/styles';

const RSVPOverviewTitle = ({ index, animIndex }) => {
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
    <HeaderContainer style={animatedStepStyle}>
      <HeaderTitle>Overview</HeaderTitle>
      <HeaderText>Please review your answers</HeaderText>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: ${SubmitRSVP.QUESTION_HEIGHT}px;
  padding-left: 5%;
  padding-right: 15%;
  padding-bottom: 30px;
  justify-content: flex-end;
`;

const HeaderTitle = styled.Text`
  ${Typography.h1};
  ${Typography.regularFont};
  color: ${Colours.secondary};
`;

const HeaderText = styled(Animated.Text)`
  ${Typography.h1}
  ${Typography.regularFont};
  color: ${Colours.neutral.white};
`;

export default RSVPOverviewTitle;
