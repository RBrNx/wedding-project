import React, { useRef, useState } from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import theme from 'styled-theming';
import { Colours, Outlines, Theme, Typography } from 'library/styles';

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
  rounded,
  showCharacterCount = false,
  placeholderComponent,
}) => {
  const textInput = useRef();
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
  const placeholderAnimatedStyles = useAnimatedStyle(() => {
    let opacity = value ? 0 : focusAnimation.value;
    let translateX = interpolate(focusAnimation.value, [0, 1], [10, 0], Extrapolate.CLAMP);
    if (rounded) {
      opacity = value ? 0 : 1;
      translateX = 0;
    }

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <>
      <ContainerComponent
        style={style}
        isFocused={isFocused}
        onPress={() => textInput.current.focus()}
        rounded={rounded}
      >
        <FocusedLabel style={focusedLabelAnimatedStyles}>{label?.toUpperCase()}</FocusedLabel>
        <RegularLabel style={regularLabelAnimatedStyles} multiline={multiline}>
          {label}
        </RegularLabel>
        {!placeholderComponent && (
          <PlaceholderLabel style={placeholderAnimatedStyles} multiline={multiline} rounded={rounded}>
            {placeholder}
          </PlaceholderLabel>
        )}
        {placeholderComponent && placeholderComponent(placeholderAnimatedStyles, multiline)}
        <StyledTextInput
          ref={textInput}
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
      {showCharacterCount && (
        <CharacterCount>
          {value?.length || 0}/{maxLength}
        </CharacterCount>
      )}
    </>
  );
};

const Container = styled.Pressable`
  background-color: ${Theme.card};
  width: 100%;
  padding: 10px;
  padding-left: 15px;
  padding-top: 26px;
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
  border-color: ${props => (props.isFocused ? Colours.secondary : 'transparent')};
  ${Outlines.inputBorder}
  ${props =>
    props.rounded &&
    css`
      height: 56px;
      border-radius: 28px;
      padding-top: 10px;
      padding-left: 20px;
      justify-content: center;
    `}
`;

const FlatContainer = styled(Container)`
  border-color: ${props => (props.isFocused ? Colours.secondary : Colours.neutral.grey2)};
  border-width: ${props => (props.isFocused ? 1.5 : 0.5)}px;
  elevation: ${props => (props.isFocused ? 4 : 0)};
`;

const FocusedLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 8px;
  ${Typography.boldFont};
  font-size: 11px;
  color: ${theme('theme', {
    light: Colours.neutral.offBlack,
    dark: Colours.neutral.offWhite,
  })};
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
  ${Typography.body};
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
  ${props =>
    props.rounded &&
    css`
      top: 15px;
      left: 20px;
    `}
`;

const StyledTextInput = styled.TextInput`
  ${Typography.body};
  color: ${theme('theme', {
    light: Colours.neutral.offBlack,
    dark: Colours.neutral.offWhite,
  })};
  min-height: ${props => (props.multiline ? 150 : 0)}px;
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
`;

const CharacterCount = styled.Text`
  color: ${Theme.detailTextColour};
  align-self: flex-end;
  margin-right: 5px;
  margin-top: 5px;
`;

export default StandardTextInput;
