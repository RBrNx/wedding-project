import EnumLabel from 'library/components/EnumLabel';
import React from 'react';
import styled from 'styled-components';

const StandardEnumSelect = ({ value, onSelect, enumObject }) => {
  return (
    <Container>
      {Object.keys(enumObject).map(enumValue => {
        const isSelected = enumValue === value;
        return (
          <EnumLabel
            key={enumValue}
            type={enumValue}
            selected={isSelected}
            onPress={() => onSelect(enumValue)}
            enumObject={enumObject}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default StandardEnumSelect;
