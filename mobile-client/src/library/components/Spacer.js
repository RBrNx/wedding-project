/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components/native';

const Spacer = ({ size, axis, style, ...rest }) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;

  return <StyledSpacer style={[style]} width={width} height={height} {...rest} />;
};

const StyledSpacer = styled.View`
  width: ${props => props.width}px;
  min-width: ${props => props.width}px;
  height: ${props => props.height}px;
  min-height: ${props => props.height}px;
`;

export default Spacer;
