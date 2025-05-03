import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Spacer from 'library/components/Spacer';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import theme from 'styled-theming';

dayjs.extend(customParseFormat);

const WeddingSchedule = ({ schedule }) => {
  return (
    <Card>
      <HeadingText>Wedding Schedule</HeadingText>
      <Spacer size={25} />
      {schedule?.map(({ time, name }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          <EventText>{`${dayjs(time, 'HH:mm').format('h:mm A')} - ${name}`}</EventText>
          <Spacer size={5} />
        </React.Fragment>
      ))}
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
