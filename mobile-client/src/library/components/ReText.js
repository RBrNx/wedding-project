/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import styled from 'styled-components/native';

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = ({ label, value, style }) => {
  const text = useDerivedValue(() => {
    return `${value.value}`;
  });
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <Container style={style}>
      <Label>{label}</Label>
      <StyledTextInput underlineColorAndroid='transparent' editable={false} value={text.value} {...{ animatedProps }} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  margin-right: 15px;
  color: #fff;
`;

const StyledTextInput = styled(AnimatedTextInput)`
  color: #fff;
`;

export default ReText;
