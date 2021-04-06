import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AlternativeTextInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  maxLength,
  multiline,
  style,
  inputStyle,
}) => {
  const focusAnimation = useSharedValue(value ? 1 : 0);

  const onFocus = () => {
    focusAnimation.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.exp) });
  };

  const onBlur = () => {
    if (value) return;

    focusAnimation.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.exp) });
  };

  const smallLabelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(focusAnimation.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ translateY: interpolate(focusAnimation.value, [0, 1], [15, 0], Extrapolate.CLAMP) }],
  }));
  const regularLabelAnimatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(focusAnimation.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    transform: [{ translateX: interpolate(focusAnimation.value, [0.75, 1], [0, -10], Extrapolate.CLAMP) }],
  }));
  const placeholderAnimatedStyles = useAnimatedStyle(() => ({
    opacity: value ? 0 : focusAnimation.value,
    transform: [{ translateX: interpolate(focusAnimation.value, [0, 1], [10, 0], Extrapolate.CLAMP) }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={[styles.smallLabel, smallLabelAnimatedStyles]}>{label.toUpperCase()}</Animated.Text>
      <Animated.Text style={[styles.regularLabel, regularLabelAnimatedStyles]}>{label}</Animated.Text>
      <Animated.Text style={[styles.placeholder, placeholderAnimatedStyles]}>{placeholder}</Animated.Text>
      <TextInput
        style={[styles.input, inputStyle]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    paddingLeft: 15,
    paddingTop: 26,
  },
  regularLabel: {
    position: 'absolute',
    top: 20,
    left: 15,
    color: '#aaa',
    fontSize: 16,
  },
  smallLabel: {
    position: 'absolute',
    fontSize: 11,
    left: 15,
    top: 8,
    color: '#484848',
    fontFamily: 'Muli_700Bold',
  },
  placeholder: {
    position: 'absolute',
    top: 28,
    left: 15,
    color: '#aaa',
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
});

export default AlternativeTextInput;
