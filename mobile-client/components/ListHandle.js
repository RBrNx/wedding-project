import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Colours, Layout, Theme } from '../styles';

const ListHandle = ({ animatedHandleContainerStyle }) => {
  return (
    <HandleContainer style={[animatedHandleContainerStyle]}>
      <Handle />
    </HandleContainer>
  );
};

const HandleContainer = styled(Animated.View)`
  width: 100%;
  height: 20px;
  background-color: ${Theme.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  ${Layout.flexCenter};
`;

const Handle = styled.View`
  width: 30px;
  height: 5px;
  border-radius: 5px;
  background-color: ${Colours.neutral.grey};
`;

export default ListHandle;
