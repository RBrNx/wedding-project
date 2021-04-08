import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const StepTransition = ({ steps = [], renderStep = () => null, renderCount = 3, animIndex }) => {
  return (
    <Container>
      {steps.map((step, index) => {
        const indexOutOfRange = Math.abs(index - animIndex.value > renderCount);
        if (indexOutOfRange || !step) return null;

        return renderStep({ step, index });
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  width: ${width}px;
`;

export default StepTransition;
