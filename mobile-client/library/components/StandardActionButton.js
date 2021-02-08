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
  label,
  onPress,
  onMessageClose,
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
    closeMessage,
    isFullSize,
    isShowingMessage,
    animatedExpansionStyle,
    animatedButtonStyle,
    animatedMessageStyle,
  } = useAnimatedActionButton({
    size,
    label,
    isPressed,
    maxExpansionWidth,
    animationDuration,
    onMessageClose,
    errorMessage,
    expandToFullButton,
  });

  return (
    <View style={styles.fullscreenContainer} pointerEvents='box-none'>
      <AnimatedPressable
        style={[
          styles.expansion,
          {
            height: size,
            borderRadius: size / 2,
            backgroundColor: isPressed ? colors.buttonPressed : colors.button,
          },
          animatedExpansionStyle,
          expansionStyle,
        ]}
        onPress={isFullSize ? onPress : null}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
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
      </AnimatedPressable>
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
