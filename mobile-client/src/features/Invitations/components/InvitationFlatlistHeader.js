import StandardSearchSortBar from 'library/components/StandardSearchSortBar';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const InvitationFlatlistHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <Container>
      <StandardSearchSortBar value={searchTerm} onChangeText={setSearchTerm} />
    </Container>
  );
};

const Container = styled.View`
  padding-horizontal: 5%;
  margin-bottom: 25px;
`;

export default InvitationFlatlistHeader;
