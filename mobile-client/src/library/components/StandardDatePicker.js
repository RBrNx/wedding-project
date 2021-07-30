import React, { useState } from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

const StandardDatePicker = ({
  label,
  value,
  placeholder,
  onChange,
  multiline,
  style,
  flat,
  rounded,
  placeholderComponent,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const focusAnimation = useSharedValue(value ? 1 : 0);
  const ContainerComponent = flat ? FlatContainer : Container;

  const onChangeDate = selectedDate => {
    focusAnimation.value = withTiming(selectedDate ? 1 : 0, { duration: 150, easing: Easing.out(Easing.exp) });
    if (selectedDate) {
      setIsModalShown(false);
      onChange(selectedDate);
    }
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
        isFocused={isModalShown || !!value}
        onPress={() => setIsModalShown(true)}
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
        {value && <Value>{dayjs(value).format('DD/MM/YYYY')}</Value>}
      </ContainerComponent>
      <DateTimePickerModal
        isVisible={isModalShown}
        mode='date'
        onConfirm={onChangeDate}
        onCancel={() => setIsModalShown(false)}
      />
    </>
  );
};

const Container = styled.Pressable`
  background-color: ${Theme.card};
  width: 100%;
  height: 67px;
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

const Value = styled.Text`
  ${Typography.body};
  color: ${theme('theme', {
    light: Colours.neutral.offBlack,
    dark: Colours.neutral.offWhite,
  })};
`;

export default StandardDatePicker;
