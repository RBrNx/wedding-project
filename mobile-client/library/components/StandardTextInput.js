import React, { useState } from 'react';
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

const StandardTextInput = ({
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
  flat,
}) => {
  const [isFocused, setIsFocused] = useState(!!value);
  const focusAnimation = useSharedValue(value ? 1 : 0);
  const ContainerComponent = flat ? FlatContainer : Container;

  const onFocus = () => {
    setIsFocused(true);
    focusAnimation.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.exp) });
  };

  const onBlur = () => {
    if (value) return;

    setIsFocused(false);
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
    <ContainerComponent style={style} isFocused={isFocused}>
      <FocusedLabel style={focusedLabelAnimatedStyles}>{label?.toUpperCase()}</FocusedLabel>
      <RegularLabel style={regularLabelAnimatedStyles} multiline={multiline}>
        {label}
      </RegularLabel>
      <PlaceholderLabel style={placeholderAnimatedStyles} multiline={multiline}>
        {placeholder}
      </PlaceholderLabel>
      <StyledTextInput
        value={value}
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
    </ContainerComponent>
  );
};

const Container = styled.View`
  background-color: ${Colours.neutral.white};
  width: 100%;
  padding: 10px;
  padding-left: 15px;
  padding-top: 26px;
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
  border-color: ${props => (props.isFocused ? Colours.secondary : 'transparent')};
  ${Outlines.inputBorder}
`;

const FlatContainer = styled(Container)`
  border-color: ${props => (props.isFocused ? Colours.secondary : Colours.neutral.grey3)};
  background-color: ${props => (props.isFocused ? Colours.neutral.white : Colours.neutral.offWhite)};
  border-width: ${props => (props.isFocused ? 1.5 : 0.5)}px;
  elevation: ${props => (props.isFocused ? 4 : 0)};
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
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
`;

const PlaceholderLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 28px;
  color: #aaa;
  ${Typography.regular};
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
`;

const StyledTextInput = styled.TextInput`
  ${Typography.regular};
  min-height: ${props => (props.multiline ? 150 : 0)}px;
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
`;

export default StandardTextInput;
