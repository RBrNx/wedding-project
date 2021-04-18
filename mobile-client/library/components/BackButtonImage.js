import React from 'react';
import { Assets } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Colours } from '../../styles';

const BackButtonImage = ({ style }) => {
  return <StyledImage source={Assets[0]} fadeDuration={0} style={style} />;
};

const StyledImage = styled.Image`
  tint-color: ${Colours.neutral.black};
  margin-left: ${Platform.OS === 'ios' ? 2 : 0}px;
`;

export default BackButtonImage;
