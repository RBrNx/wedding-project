import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const DismissKeyboard = ({ children, style }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container style={style}>{children}</Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default DismissKeyboard;
