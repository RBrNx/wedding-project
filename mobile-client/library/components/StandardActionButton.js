import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useDerivedValue, runOnJS } from 'react-native-reanimated';
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
  animationDuration = 500,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors } = useTheme();
  const {
    expansion,
    buttonText,
    showMessage,
    closeMessage,
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  } = useAnimatedActionButton({
    size,
    isPressed,
    maxExpansionWidth,
    animationDuration,
  });

  const storeExpandedState = newState => {
    if (newState !== isExpanded) {
      setIsExpanded(newState);
      if (!newState && onButtonShrink) onButtonShrink();
    }
  };

  useDerivedValue(() => {
    if (expansion.value > 0.5 && !isExpanded) runOnJS(storeExpandedState)(true);
    else if (expansion.value <= 0.5 && isExpanded) runOnJS(storeExpandedState)(false);
  }, [isExpanded]);

  useEffect(() => {
    if (errorMessage) showMessage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <View style={styles.fullscreenContainer} pointerEvents='box-none'>
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
          {buttonText}
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
