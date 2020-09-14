import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const roundedRectData = (w, h, r, gap) => {
  const padding = gap ? 10 : 0;
  const padLeft = 30 - padding;
  const width = w - r * 2;
  const height = h - r * 2;
  const widthIncludingGap = width - padLeft - gap - padding; // Padding is removed twice as it applies to both sides of the text

  return `
    m ${r + padLeft} 0
    l -${padLeft} 0
    a ${r} ${r} 0 0 0 -${r} ${r}
    l 0 ${height}
    a ${r} ${r} 0 0 0 ${r} ${r}
    l ${width} 0
    a ${r} ${r} 0 0 0 ${r} -${r}
    l 0 -${height}
    a ${r} ${r} 0 0 0 -${r} -${r}
    l -${widthIncludingGap} 0
  `;
};

const AnimatedInputBorder = ({ style, height, width, borderRadius, label, labelStyle, animate }) => {
  const [borderAnim] = useState(new Animated.Value(0));
  const [gapWidth, setGapWidth] = useState(0);

  const fullRectangle = roundedRectData(width, height, borderRadius, 0);
  const gapRectangle = roundedRectData(width, height, borderRadius, gapWidth);

  const path = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [fullRectangle, gapRectangle],
  });

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: animate ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [borderAnim, animate]);

  return (
    <View style={[{ height: '100%', width: '100%', position: 'absolute' }, style]} pointerEvents='none'>
      <Svg viewBox={`-0.5 5 ${width + 1} ${height}`} width='100%' height='100%'>
        <AnimatedPath d={path} stroke='#fff' strokeWidth='0.5' />
      </Svg>
      <Text
        style={[labelStyle, { opacity: 0 }]}
        onLayout={event => {
          const { width: layoutWidth } = event.nativeEvent.layout;
          setGapWidth(layoutWidth);
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default AnimatedInputBorder;
