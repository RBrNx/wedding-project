import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  withTiming,
  Easing,
  withSequence,
  withDelay,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import useAnimatedActionButton from '../hooks/useAnimatedActionButton';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StandardActionButton = ({
  size = 56,
  icon,
  onPress,
  onButtonShrink,
  errorMessage,
  expansionStyle = { right: 16, bottom: 16 },
  buttonStyle,
  messageStyle,
  maxExpansionWidth = width,
  animDuration = 500,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors } = useTheme();
  const { expansion, animatedExpansionStyle, animatedButtonStyle, animatedMessageStyle } = useAnimatedActionButton({
    size,
    isPressed,
    maxExpansionWidth,
  });

  const storeExpandedState = newState => {
    if (newState !== isExpanded) {
      setIsExpanded(newState);
      if (!newState && onButtonShrink) onButtonShrink();
    }
  };

  const showMessage = () => {
    const animateOut = withTiming(1, { duration: animDuration, easing: Easing.inOut(Easing.exp) });
    const animateIn = withTiming(0, { duration: animDuration, easing: Easing.inOut(Easing.exp) });
    expansion.value = withSequence(animateOut, withDelay(3000, animateIn));
  };

  const closeMessage = () => {
    expansion.value = withTiming(0, { duration: animDuration, easing: Easing.inOut(Easing.exp) });
  };

  useDerivedValue(() => {
    if (expansion.value > 0.5 && !isExpanded) runOnJS(storeExpandedState)(true);
    else if (expansion.value <= 0.5 && isExpanded) runOnJS(storeExpandedState)(false);
  }, [isExpanded]);

  useEffect(() => {
    if (errorMessage) showMessage();
  }, [errorMessage]);

  return (
    <View style={styles.fullscreenContainer}>
      <Animated.View
        style={[
          styles.expansion,
          {
            height: size,
            borderRadius: size / 2,
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
          {errorMessage}
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
          onPress={isExpanded ? closeMessage : onPress}
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
