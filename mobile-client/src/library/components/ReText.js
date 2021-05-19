import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import styled from 'styled-components/native';

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = ({ label, text, style }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <Container>
      <Label style={style}>{label}</Label>
      <StyledTextInput
        underlineColorAndroid='transparent'
        editable={false}
        value={text.value}
        style={style}
        {...{ animatedProps }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  margin-right: 15px;
`;

const StyledTextInput = styled(AnimatedTextInput)`
  color: #fff;
`;

export default ReText;
