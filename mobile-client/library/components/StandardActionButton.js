import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
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
  expandToFullButton,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useTheme();
  const {
    buttonText,
    showMessage,
    closeMessage,
    expandToFullSize,
    isFullSize,
    isShowingMessage,
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  } = useAnimatedActionButton({
    size,
    isPressed,
    maxExpansionWidth,
    animationDuration,
    onButtonShrink,
  });

  useEffect(() => {
    if (errorMessage) showMessage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  useEffect(() => {
    if (expandToFullButton) expandToFullSize('Submit RSVP');
    else closeMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandToFullButton]);

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
            isFullSize ? styles.fullSizeMessage : {},
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
          onPress={isShowingMessage ? closeMessage : onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          {isShowingMessage ? <Ionicons name='close-outline' size={36} color='#fff' /> : icon()}
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
    display: 'flex',
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
  fullSizeMessage: {
    textAlign: 'center',
    marginRight: 0,
    marginLeft: 0,
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
