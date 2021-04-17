import React from 'react';
import { Assets } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Colours } from '../../styles';

const BackButtonImage = ({ style }) => {
  return <StyledImage source={Assets[0]} fadeDuration={0} style={style} />;
};

const StyledImage = styled.Image`
  tint-color: ${Colours.neutral.black};
`;

export default BackButtonImage;
