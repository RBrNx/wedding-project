import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  Easing,
  withSequence,
  withDelay,
  interpolateColor,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StandardActionButton = ({ size = 56, icon, expansionStyle, buttonStyle, messageStyle }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const actionButtonExpansion = useSharedValue(0);
  const { colors } = useTheme();
  const closeColor = Color(colors.button)
    .lighten(0.2)
    .string();
  const closePressedColor = Color(colors.button)
    .lighten(0.1)
    .string();

  const switchIcon = newState => {
    if (newState !== isExpanded) setIsExpanded(newState);
  };

  const showMessage = () => {
    const animateOut = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.exp) });
    const animateIn = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.exp) });
    actionButtonExpansion.value = withSequence(animateOut, withDelay(3000, animateIn));
  };

  const closeMessage = () => {
    actionButtonExpansion.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.exp) });
  };

  useDerivedValue(() => {
    if (actionButtonExpansion.value > 0.5 && !isExpanded) runOnJS(switchIcon)(true);
    else if (actionButtonExpansion.value <= 0.5 && isExpanded) runOnJS(switchIcon)(false);
  }, [isExpanded]);

  const animatedExpansionStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(actionButtonExpansion.value, [0, 1], [size, width - width * 0.05 - 16], Extrapolate.CLAMP),
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const rotate = interpolate(actionButtonExpansion.value, [0, 1], [0, 180], Extrapolate.CLAMP);
    const bgColor = interpolateColor(
      actionButtonExpansion.value,
      [0, 1],
      [isPressed ? colors.buttonPressed : colors.button, isPressed ? closePressedColor : closeColor],
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
      backgroundColor: bgColor,
    };
  });

  const animatedMessageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(actionButtonExpansion.value, [0, 0.65, 1], [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={styles.fullscreenContainer}>
      <Animated.View
        style={[
          styles.expansion,
          {
            height: size,
            borderRadius: size / 2,
            right: 16,
            bottom: 16,
            backgroundColor: colors.button,
          },
          animatedExpansionStyle,
          expansionStyle,
        ]}
      >
        <Animated.Text
          style={[
            styles.message,
            {
              marginRight: size,
            },
            animatedMessageStyle,
            messageStyle,
          ]}
        >
          Please select an answer before continuing.
        </Animated.Text>
        <AnimatedPressable
          style={[
            styles.button,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            animatedButtonStyle,
            buttonStyle,
          ]}
          onPress={isExpanded ? closeMessage : showMessage}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          {isExpanded ? <Ionicons name='close-outline' size={36} color='#fff' /> : icon()}
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  expansion: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  message: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#fff',
    paddingLeft: 0,
    marginLeft: 30,
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
