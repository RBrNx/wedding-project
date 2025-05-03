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
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import { Modal } from 'react-native';
import StandardPressable from './StandardPressable';
import Spacer from './Spacer';

const StandardSelectInput = ({
  label,
  value,
  options,
  placeholder,
  onChange,
  style,
  flat,
  rounded,
  placeholderComponent,
  error,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const focusAnimation = useSharedValue(value ? 1 : 0);
  const ContainerComponent = flat ? FlatContainer : Container;
  const selectedValue = value?.value;
  const selectedOption = options.find(option => option.value === selectedValue);

  const onOptionSelect = option => {
    focusAnimation.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.exp) });
    setIsModalShown(false);
    onChange(option);
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
        error={error}
      >
        <FocusedLabel style={focusedLabelAnimatedStyles}>{label?.toUpperCase()}</FocusedLabel>
        <RegularLabel style={regularLabelAnimatedStyles}>{label}</RegularLabel>
        {!placeholderComponent && (
          <PlaceholderLabel style={placeholderAnimatedStyles} rounded={rounded}>
            {placeholder}
          </PlaceholderLabel>
        )}
        {placeholderComponent && placeholderComponent(placeholderAnimatedStyles)}
        {selectedOption && <Value>{selectedOption.label}</Value>}
      </ContainerComponent>
      <Modal animationType='fade' transparent visible={isModalShown} onRequestClose={() => setIsModalShown(false)}>
        <ModalBackground onPress={() => setIsModalShown(false)}>
          <ModalView>
            {options.map((option, index) => {
              const isSelected = selectedOption?.value === option.value;
              return (
                <React.Fragment key={option.value}>
                  <Option selected={isSelected} onPress={() => onOptionSelect(option)}>
                    <OptionLabel>{option.label}</OptionLabel>
                  </Option>
                  {index < options.length - 1 && <Spacer size={10} />}
                </React.Fragment>
              );
            })}
          </ModalView>
        </ModalBackground>
      </Modal>
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
  border-color: ${props => {
    if (props.isFocused) return Colours.secondary;
    if (props.error) return Colours.warning;

    return 'transparent';
  }};
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
`;

const PlaceholderLabel = styled(Animated.Text)`
  position: absolute;
  left: 15px;
  top: 28px;
  color: #aaa;
  ${Typography.body};
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

const ModalBackground = styled(StandardPressable)`
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalView = styled.View`
  width: 90%;
  background-color: ${Theme.background};
  padding: 2.5%;
  ${Outlines.borderRadius};
  ${Layout.flexCenter};
`;

const Option = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  width: 100%;
  background-color: ${Theme.card};
  border: 2px solid ${props => (props.selected ? Colours.secondary : 'transparent')};
  ${Outlines.borderRadius};
  ${Layout.flexCenter};
`;

const OptionLabel = styled.Text`
  ${Typography.body};
  color: ${Theme.headerTextColour};
  padding: 15px;
`;

export default StandardSelectInput;
