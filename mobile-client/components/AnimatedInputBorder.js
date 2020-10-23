import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const roundedRectData = (w, h, r, startingXPos, gap) => {
  const leftPadding = gap ? 5 : 0;
  const rightPadding = gap ? 10 : 0;
  const width = w - r * 2;
  const height = h - r * 2;

  return `
    m ${startingXPos + gap + rightPadding} 0
    l ${w - (startingXPos + gap + r + rightPadding)} 0
    a ${r} ${r} 0 0 1 ${r} ${r}
    l 0 ${height}
    a ${r} ${r} 0 0 1 -${r} ${r}
    l -${width} 0
    a ${r} ${r} 0 0 1 -${r} -${r}
    l 0 -${height}
    a ${r} ${r} 0 0 1 ${r} -${r}
    l ${startingXPos - r - leftPadding} 0
  `;
};

const AnimatedInputBorder = ({ style, height, width, borderRadius, labelXPos, gapWidth, animate }) => {
  const [borderAnim] = useState(new Animated.Value(0));
  const [viewWidth, setViewWidth] = useState(0);
  const ratio = viewWidth ? width / viewWidth : 1;

  const fullRectangle = roundedRectData(width, height, borderRadius, labelXPos, 0);
  const gapRectangle = roundedRectData(width, height, borderRadius, labelXPos, gapWidth * ratio);

  const path = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [fullRectangle, gapRectangle],
  });
  const colour = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(170, 170, 170)', 'rgb(255, 255, 255)'],
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
      <Svg viewBox={`-0.75 0 ${width + 1} ${height}`} width='100%' height={height}>
        <AnimatedPath d={path} stroke={colour} strokeWidth='0.75' />
      </Svg>
    </View>
  );
};

export default AnimatedInputBorder;
