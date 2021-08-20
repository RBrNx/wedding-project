import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import theme from 'styled-theming';
import StandardButton from 'library/components/StandardButton';

const EditVenueCard = ({ venue }) => {
  return (
    <Card>
      <HeadingText>Wedding Venue</HeadingText>
      <Spacer size={25} />
      {!venue && (
        <EmptyContainer>
          <EmptyDescription>Let your guests know where the big day is taking place 💒</EmptyDescription>
          <Spacer size={30} />
          <StandardButton text='Add Venue Details' outline onPress={() => {}} />
        </EmptyContainer>
      )}
    </Card>
  );
};

const Card = styled.View`
  width: 100%;
  padding: 5%;
  background-color: ${theme('theme', {
    light: Colours.neutral.offWhite,
    dark: Colours.neutral.grey5,
  })};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const EmptyContainer = styled.View`
  ${Layout.flexCenter};
`;

const EmptyDescription = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  text-align: center;
`;

export default EditVenueCard;
