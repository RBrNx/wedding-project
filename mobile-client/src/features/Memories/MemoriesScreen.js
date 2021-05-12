import { Layout } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import Gallery from './components/Gallery';

const MemoriesScreen = () => {
  return (
    <Container>
      <Gallery />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: ${Layout.statusBarHeight}px;
`;

export default MemoriesScreen;
