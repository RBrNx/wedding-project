import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const roundedRectData = (w, h, r, startingXPos, gap, stroke) => {
  const leftPadding = gap ? 5 : 0;
  const rightPadding = gap ? 10 : 0;
  const width = w - r * 2;
  const height = h - r * 2;

  return `
    m ${startingXPos + gap + rightPadding} ${stroke / 2}
    h ${w - (startingXPos + gap + r + rightPadding) - stroke}
    a ${r} ${r} 0 0 1 ${r} ${r}
    v ${height - stroke}
    a ${r} ${r} 0 0 1 -${r} ${r}
    h -${width - stroke * 2}
    a ${r} ${r} 0 0 1 -${r} -${r}
    v -${height - stroke}
    a ${r} ${r} 0 0 1 ${r} -${r}
    h ${startingXPos - r - leftPadding}
  `;
};

const AnimatedInputBorder = ({
  style,
  height,
  width,
  borderRadius,
  stroke = 2,
  labelXPos,
  gapWidth,
  animate,
  borderColour,
}) => {
  const [borderAnim] = useState(new Animated.Value(0));
  const [viewWidth, setViewWidth] = useState(0);
  const ratio = viewWidth ? width / viewWidth : 1;
  const { colors } = useTheme();

  const fullRectangle = roundedRectData(width, height, borderRadius, labelXPos, 0, stroke);
  const gapRectangle = roundedRectData(width, height, borderRadius, labelXPos, gapWidth * ratio, stroke);

  const path = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [fullRectangle, gapRectangle],
  });
  const colour = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'rgb(170, 170, 170)',
      Color(borderColour || colors.border)
        .rgb()
        .string(),
    ],
  });

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: animate ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [borderAnim, animate]);

  return (
    <View
      style={[{ width: '100%', height, position: 'absolute' }, style]}
      pointerEvents='none'
      onLayout={event => {
        const { width: vWidth } = event.nativeEvent.layout;
        setViewWidth(vWidth);
      }}
    >
      <Svg viewBox={`0 0 ${width} ${height}`}>
        <AnimatedPath d={path} stroke={colour} strokeWidth={stroke} />
      </Svg>
    </View>
  );
};

export default AnimatedInputBorder;
