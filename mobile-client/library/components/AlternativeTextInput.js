import React from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Outlines, Typography } from '../../styles';

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

  const focusedLabelAnimatedStyles = useAnimatedStyle(() => ({
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
    <Container style={style}>
      <FocusedLabel style={focusedLabelAnimatedStyles}>{label.toUpperCase()}</FocusedLabel>
      <RegularLabel style={regularLabelAnimatedStyles}>{label}</RegularLabel>
      <PlaceholderLabel style={placeholderAnimatedStyles}>{placeholder}</PlaceholderLabel>
      <StyledTextInput
        style={inputStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${Colours.neutral.white};
  width: 100%;
  padding: 10px;
  padding-left: 15px;
  padding-top: 26px;
  ${Outlines.borderRadius};
`;

const FocusedLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 8px;
  color: ${Colours.neutral.offBlack};
  font-family: 'Muli_700Bold';
  font-size: 11px;
`;

const RegularLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 20px;
  color: #aaa;
  font-size: 16px;
`;

const PlaceholderLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 28px;
  color: #aaa;
  ${Typography.regular};
`;

const StyledTextInput = styled.TextInput`
  ${Typography.regular};
`;

export default AlternativeTextInput;
