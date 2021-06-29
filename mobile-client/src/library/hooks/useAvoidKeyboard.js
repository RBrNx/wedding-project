import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const useAvoidKeyboard = ({
  padding = 25,
  showDuration = 400,
  hideDuration = 200,
  includeKeyboardHeight = true,
  handleShow,
  handleHide,
} = {}) => {
  const avoidKeyboardHeight = useSharedValue(0);

  const defaultShowHandler = event => {
    const { height } = event.endCoordinates;
    avoidKeyboardHeight.value = withTiming(includeKeyboardHeight ? height + padding : padding, {
      duration: showDuration,
      easing: Easing.out(Easing.exp),
    });
  };
  const defaultHideHandler = () => {
    avoidKeyboardHeight.value = withTiming(0, { duration: hideDuration, easing: Easing.out(Easing.exp) });
  };

  useEffect(() => {
    const isIOS = Platform.OS === 'ios';
    const showEvent = isIOS ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = isIOS ? 'keyboardWillHide' : 'keyboardDidHide';

    Keyboard.addListener(showEvent, event => {
      defaultShowHandler(event);
      if (handleShow) handleShow(event);
    });
    Keyboard.addListener(hideEvent, event => {
      defaultHideHandler(event);
      if (handleHide) handleHide(event);
    });

    return () => {
      Keyboard.removeListener(showEvent);
      Keyboard.removeListener(hideEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avoidKeyboardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -avoidKeyboardHeight.value }],
  }));

  return {
    avoidKeyboardStyle,
    avoidKeyboardHeight,
  };
};

export default useAvoidKeyboard;
