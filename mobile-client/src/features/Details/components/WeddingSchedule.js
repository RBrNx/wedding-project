import Spacer from 'library/components/Spacer';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import theme from 'styled-theming';

const WeddingSchedule = () => {
  return (
    <Card>
      <HeadingText>Wedding Schedule</HeadingText>
      <Spacer size={25} />
      <EventText>2:00 PM - Ceremony</EventText>
      <Spacer size={5} />
      <EventText>3:00 PM - Drinks Reception</EventText>
      <Spacer size={5} />
      <EventText>4:30 PM - Speeches</EventText>
      <Spacer size={5} />
      <EventText>5:00 PM - Wedding Breakfast</EventText>
      <Spacer size={5} />
      <EventText>7:30 PM - Evening Guests Arrival</EventText>
      <Spacer size={5} />
      <EventText>8:00 PM - First Dance</EventText>
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

const EventText = styled.Text`
  ${Typography.body};
  color: ${Theme.bodyTextColour};
`;

export default WeddingSchedule;
