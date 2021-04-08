import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const useAvoidKeyboard = ({ padding = 25, showDuration = 400, hideDuration = 200 } = {}) => {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const isIOS = Platform.OS === 'ios';
    const showEvent = isIOS ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = isIOS ? 'keyboardWillHide' : 'keyboardDidHide';

    Keyboard.addListener(showEvent, event => {
      const { height } = event.endCoordinates;
      keyboardHeight.value = withTiming(height + padding, { duration: showDuration, easing: Easing.out(Easing.exp) });
    });
    Keyboard.addListener(hideEvent, () => {
      keyboardHeight.value = withTiming(0, { duration: hideDuration, easing: Easing.out(Easing.exp) });
    });

    return () => {
      Keyboard.removeListener(showEvent);
      Keyboard.removeListener(hideEvent);
    };
  });

  const avoidKeyboardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboardHeight.value }],
  }));

  return {
    avoidKeyboardStyle,
    keyboardHeight,
  };
};

export default useAvoidKeyboard;
