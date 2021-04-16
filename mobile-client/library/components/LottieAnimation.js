import React from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Layout } from '../../styles';

const LottieAnimation = React.forwardRef(
  ({ source, size = 50, autoPlay = false, loop = false, speed = 1, onAnimationFinish, resizeMode, style }, ref) => (
    <Container style={style} size={size}>
      <LottieView
        ref={ref}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        onAnimationFinish={onAnimationFinish}
        resizeMode={resizeMode}
      />
    </Container>
  ),
);

const Container = styled.View`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  ${Layout.flexCenter};
`;

export default LottieAnimation;