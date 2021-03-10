import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { interpolateColor, useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedInputBorderV2 = ({
  inputHeight,
  inputWidth,
  borderColour,
  borderRadius = 5,
  strokeWidth = 1.5,
  gapStartX = 30,
  gapWidth,
  focusAnimationProgress,
  style,
}) => {
  const [widthRatio, setWidthRatio] = useState(1);
  const { colors } = useTheme();

  const gapValues = useDerivedValue(() => {
    const maxGap = gapWidth * widthRatio;
    const padding = 5;

    return {
      size: focusAnimationProgress.value * maxGap,
      padding: focusAnimationProgress.value * padding,
    };
  });

  const animatedProps = useAnimatedProps(() => {
    const width = inputWidth;
    const height = inputHeight;
    const radius = borderRadius;
    const widthMinusCorners = width - borderRadius * 2;
    const heightMinusCorners = height - borderRadius * 2;
    const { size, padding } = gapValues.value;

    const path = `
      m ${gapStartX + size + padding} ${strokeWidth / 2}
      h ${width - (gapStartX + size + radius + padding) - strokeWidth}
      a ${radius} ${radius} 0 0 1 ${radius} ${radius}
      v ${heightMinusCorners - strokeWidth}
      a ${radius} ${radius} 0 0 1 -${radius} ${radius}
      h -${widthMinusCorners - strokeWidth * 2}
      a ${radius} ${radius} 0 0 1 -${radius} -${radius}
      v -${heightMinusCorners - strokeWidth}
      a ${radius} ${radius} 0 0 1 ${radius} -${radius}
      h ${gapStartX - radius - padding}
    `;

    return {
      d: path,
      stroke: interpolateColor(focusAnimationProgress.value, [0, 1], [colors.border, borderColour || colors.border]),
    };
  });

  return (
    <View
      style={[{ width: '100%', height: inputHeight, position: 'absolute' }, style]}
      pointerEvents='none'
      onLayout={event => {
        const { width: viewWidth } = event.nativeEvent.layout;
        setWidthRatio(inputWidth / viewWidth);
      }}
    >
      <Svg viewBox={`0 0 ${inputWidth} ${inputHeight}`}>
        <AnimatedPath animatedProps={animatedProps} strokeWidth={strokeWidth} />
      </Svg>
    </View>
  );
};

export default AnimatedInputBorderV2;
