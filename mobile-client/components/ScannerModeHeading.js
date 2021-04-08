import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import Spacer from '../library/components/Spacer';
import { Colours, Typography } from '../styles';

const { height } = Dimensions.get('window');

const ScannerModeHeading = ({ heading, subHeading, scannerModeIndex, index }) => {
  const animatedHeadingStyle = useAnimatedStyle(() => {
    const normalisedAnim = index - scannerModeIndex.value;

    const opacity = interpolate(normalisedAnim, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);

    return {
      opacity,
    };
  });

  return (
    <HeadingContainer style={animatedHeadingStyle}>
      <HeadingText>{heading}</HeadingText>
      <Spacer size={15} />
      <SubHeadingText>{subHeading}</SubHeadingText>
    </HeadingContainer>
  );
};

const HeadingContainer = styled(Animated.View)`
  position: absolute;
  top: ${height * 0.15}px;
  width: 100%;
  padding-horizontal: 5%;
`;

const HeadingText = styled.Text`
  ${Typography.heading};
  color: ${Colours.neutral.white};
  text-align: center;
`;

const SubHeadingText = styled.Text`
  ${Typography.subheading};
  color: ${Colours.neutral.grey};
  text-align: center;
`;

export default ScannerModeHeading;
