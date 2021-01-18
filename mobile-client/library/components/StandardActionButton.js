import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  Easing,
  withSequence,
  withDelay,
  interpolateColors,
  interpolateColor,
  useDerivedValue,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { constantStyles } from '../../styles/theming';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StandardActionButton = ({ size = 56, icon, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const actionButtonExpansion = useSharedValue(0);
  const { colors } = useTheme();
  const backgroundColor = colors.secondary;
  const pressedColour = Color(colors.secondary)
    .lighten(0.2)
    .toString();

  const switchIcon = newState => {
    if (newState !== isExpanded) setIsExpanded(newState);
  };

  useDerivedValue(() => {
    if (actionButtonExpansion.value > 0.5 && !isExpanded) runOnJS(switchIcon)(true);
    else if (actionButtonExpansion.value <= 0.5 && isExpanded) runOnJS(switchIcon)(false);
  }, [isExpanded]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(actionButtonExpansion.value, [0, 1], [size, width - width * 0.05 - 16], Extrapolate.CLAMP),
    };
  });
  const animatedStyles2 = useAnimatedStyle(() => {
    const rotate = interpolate(actionButtonExpansion.value, [0, 1], [0, 180], Extrapolate.CLAMP);
    const bgColor = interpolateColor(actionButtonExpansion.value, [0, 1], [backgroundColor, pressedColour]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
      backgroundColor: bgColor,
    };
  });
  const animatedStyles3 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(actionButtonExpansion.value, [0, 0.65, 1], [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  const showMessage = () => {
    const animateOut = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.exp) });
    const animateIn = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.exp) });
    actionButtonExpansion.value = withSequence(animateOut, withDelay(3000, animateIn));
  };

  const closeMessage = () => {
    actionButtonExpansion.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.exp) });
  };

  // const renderButtonStyles = ({ pressed }) => {
  //   const buttonStyles = [
  //     styles.button,
  //     {
  //       width: size,
  //       height: size,
  //       borderRadius: size / 2,
  //       right: 16,
  //       bottom: 16,
  //       backgroundColor: pressed ? pressedColour : backgroundColor,
  //       // transform: [{ scaleX }],
  //     },
  //     style,
  //   ];

  //   if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

  //   return buttonStyles;
  // };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: size,
            height: size,
            borderRadius: size / 2,
            right: 16,
            bottom: 16,
            backgroundColor,
            overflow: 'hidden',
          },
          animatedStyles,
        ]}
      >
        <Animated.Text
          style={[
            {
              color: '#fff',
              paddingLeft: 0,
              flex: 1,
              flexWrap: 'wrap',
              marginLeft: 30,
              marginRight: size,
            },
            animatedStyles3,
          ]}
        >
          Please select an answer before continuing.
        </Animated.Text>
        <AnimatedPressable
          style={[
            styles.button,
            {
              backgroundColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            animatedStyles2,
          ]}
          onPress={isExpanded ? closeMessage : showMessage}
        >
          {isExpanded ? <Ionicons name='close-outline' size={36} color='#fff' /> : icon()}
        </AnimatedPressable>
      </Animated.View>
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
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default StandardActionButton;
