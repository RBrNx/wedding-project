import { Ionicons } from '@expo/vector-icons';
import { Outlines, Theme, Typography } from 'library/styles';
import React, { useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import StandardPressable from './StandardPressable';

const StandardSearchSortBar = ({ value, onChangeText, loading, style }) => {
  const searchbar = useRef(null);

  return (
    <Container style={style} onPress={() => searchbar.current?.focus()}>
      <SearchIcon name='search-outline' size={25} />
      <Searchbar ref={searchbar} value={value} onChangeText={onChangeText} />
      {loading && <StyledActivityIndicator color='#fff' size='small' />}
    </Container>
  );
};

const Container = styled(StandardPressable)`
  flex-direction: row;
  background-color: ${Theme.card};
  align-items: center;
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const SearchIcon = styled(Ionicons)`
  color: ${Theme.detailTextColour};
  margin-horizontal: 10px;
`;

const Searchbar = styled.TextInput`
  flex: 1;
  color: ${Theme.inputTextColour};
  padding-vertical: 10px;
  padding-right: 50px;
  ${Typography.body};
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  position: absolute;
  right: 10px;
`;

export default StandardSearchSortBar;
