import { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const useAvoidKeyboard = ({ padding = 25, showDuration = 400, hideDuration = 200, handleShow, handleHide } = {}) => {
  const keyboardHeight = useSharedValue(0);

  const defaultShowHandler = event => {
    const { height } = event.endCoordinates;
    keyboardHeight.value = withTiming(height + padding, { duration: showDuration, easing: Easing.out(Easing.exp) });
  };
  const defaultHideHandler = () => {
    keyboardHeight.value = withTiming(0, { duration: hideDuration, easing: Easing.out(Easing.exp) });
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
    transform: [{ translateY: -keyboardHeight.value }],
  }));

  return {
    avoidKeyboardStyle,
    keyboardHeight,
  };
};

export default useAvoidKeyboard;
