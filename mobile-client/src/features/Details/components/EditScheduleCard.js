import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import theme from 'styled-theming';
import StandardButton from 'library/components/StandardButton';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import StandardPressable from 'library/components/StandardPressable';
import { AntDesign } from '@expo/vector-icons';

dayjs.extend(customParseFormat);

const EditScheduleCard = ({ schedule, onPress }) => {
  return (
    <Card>
      <HeadingContainer>
        <HeadingText>Wedding Schedule</HeadingText>
        {schedule && (
          <EditButton size={40} onPress={onPress}>
            <EditIcon name='edit' size={25} />
          </EditButton>
        )}
      </HeadingContainer>
      <Spacer size={25} />
      {!schedule && (
        <EmptyContainer>
          <EmptyDescription>Let your guests know the order of events 🍾</EmptyDescription>
          <Spacer size={30} />
          <StandardButton text='Add Schedule' outline onPress={onPress} />
        </EmptyContainer>
      )}
      {schedule &&
        schedule.map(({ time, name }, index) => (
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

const HeadingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const EditButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const EditIcon = styled(AntDesign)`
  color: ${Theme.icon};
`;

const EmptyContainer = styled.View`
  ${Layout.flexCenter};
`;

const EmptyDescription = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  text-align: center;
`;

const EventText = styled.Text`
  ${Typography.body};
  color: ${Theme.bodyTextColour};
`;

export default EditScheduleCard;
