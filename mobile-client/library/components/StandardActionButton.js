import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React, { useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, StyleSheet, View } from 'react-native';
import { constantStyles } from '../../styles/theming';

const { width } = Dimensions.get('window');

const StandardActionButton = ({ size = 56, raised, icon, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [actionButtonAnimation] = useState(new Animated.Value(0));
  const { colors } = useTheme();
  const backgroundColor = colors.secondary;
  const pressedColour = Color(colors.secondary)
    .darken(0.2)
    .toString();

  const onPress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(actionButtonAnimation, {
      toValue: isExpanded ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp),
    }).start();
  };

  const scaleValue = width - width * 0.05 - size - 16;

  const scaleX = actionButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleValue + 2],
    extrapolate: 'clamp',
  });

  const translateXSide = actionButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -scaleValue + 1],
    extrapolate: 'clamp',
  });

  const translateX = actionButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(scaleValue / 2)],
    extrapolate: 'clamp',
  });

  // const backgroundColor = actionButtonAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)'],
  //   extrapolate: 'clamp',
  // });

  const renderButtonStyles = ({ pressed }) => {
    const buttonStyles = [
      styles.button,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        right: 16,
        bottom: 16,
        backgroundColor: pressed ? pressedColour : backgroundColor,
        // transform: [{ scaleX }],
      },
      style,
    ];

    if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

    return buttonStyles;
  };

  return (
    <View style={styles.container}>
      <Pressable style={renderButtonStyles} onPress={onPress}>
        <Animated.View
          style={{
            borderTopLeftRadius: size / 2,
            borderBottomLeftRadius: size / 2,
            backgroundColor,
            width: size / 2,
            height: size,
            transform: [{ translateX: translateXSide }],
          }}
        />
        <Animated.View
          style={{
            width: 1,
            height: size,
            backgroundColor,
            // opacity: 0.5,
            transform: [{ translateX }, { scaleX }],
          }}
        />
        <View
          style={{
            borderTopRightRadius: size / 2,
            borderBottomRightRadius: size / 2,
            backgroundColor,
            width: size / 2,
            height: size,
          }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  button: {
    position: 'absolute',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default StandardActionButton;
