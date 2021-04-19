import React, { useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withDelay } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Layout } from 'library/styles';
import { withVelocity } from 'library/worklets';
import ConfettoSprite from 'assets/confetti.png';

const NUM_CONFETTI = 50;
const CONFETTI_SIZE = 16;
const COLOURS = [Colours.secondary, Colours.tertiary];
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const createConfetti = () => {
  return [...new Array(NUM_CONFETTI)].map((_, i) => {
    return {
      key: i,
      x: screenWidth * (i % 2 ? 0.25 : 0.75) - CONFETTI_SIZE / 2,
      y: -60,
      angle: 0,
      xVel: Math.random() * 400 - 200,
      yVel: Math.random() * 150 + 150,
      angleVel: (Math.random() * 3 - 1.5) * Math.PI,
      delay: Math.floor(i / 10) * 500,
      elasticity: Math.random() * 0.3 + 0.1,
      colour: COLOURS[i % COLOURS.length],
    };
  });
};

const Confetto = ({ colour, animatedParams }) => {
  const { x, y, angle, xVel, yVel, angleVel, delay, elasticity } = animatedParams;
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const rotate = useSharedValue(angle);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withVelocity({
        velocity: xVel,
        xBounds: { lower: 0, upper: screenWidth - CONFETTI_SIZE },
        elasticity,
      }),
    );
    translateY.value = withDelay(
      delay,
      withVelocity({
        velocity: yVel,
        elasticity,
      }),
    );
    rotate.value = withDelay(delay, withVelocity({ velocity: angleVel, elasticity }));
  }, []);

  /* eslint-disable no-self-assign */
  useDerivedValue(() => {
    if (translateY.value > screenHeight) {
      translateX.value = translateX.value;
      translateY.value = translateY.value;
      rotate.value = rotate.value;
    }
  });
  /* eslint-enable no-self-assign */

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}rad` },
        { rotateX: `${rotate.value}rad` },
        { rotateY: `${rotate.value}rad` },
      ],
    };
  });

  return (
    <ConfettoContainer style={animatedStyle}>
      <ConfettoImage source={ConfettoSprite} colour={colour} />
    </ConfettoContainer>
  );
};

const ConfettiCannon = ({ initialDelay = 0 }) => {
  const confetti = useMemo(createConfetti, []);

  return (
    <CannonContainer pointerEvents='none'>
      {confetti.map(({ key, colour, delay, ...animatedParams }) => {
        return (
          <Confetto key={key} colour={colour} animatedParams={{ ...animatedParams, delay: initialDelay + delay }} />
        );
      })}
    </CannonContainer>
  );
};

const CannonContainer = styled.View`
  ${Layout.absoluteFill};
`;

const ConfettoContainer = styled(Animated.View)`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const ConfettoImage = styled.Image`
  width: ${CONFETTI_SIZE}px;
  height: ${CONFETTI_SIZE}px;
  tint-color: ${props => props.colour};
`;

export default ConfettiCannon;
