import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import StandardSearchSortBar from 'library/components/StandardSearchSortBar';
import { GuestResponse } from 'library/enums';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';

const guestResponseKeys = Object.keys(GuestResponse);
const initialAttendanceStats = Object.fromEntries(Object.entries(GuestResponse).map(([key]) => [key, 0]));

const InvitationFlatlistHeader = ({
  searchTerm,
  setSearchTerm,
  invitations = [],
  responseFilter,
  setResponseFilter,
}) => {
  const attendanceStats = invitations.reduce(
    (acc, invitation) => {
      invitation.guests.forEach(guest => {
        acc[guest.attendanceStatus] = acc[guest.attendanceStatus] + 1 || 0;
        acc.Total += 1;
      });

      return acc;
    },
    { ...initialAttendanceStats, Total: 0 },
  );

  const toggleResponseFilter = responseType => {
    if (responseFilter.includes(responseType)) {
      setResponseFilter(responseFilter.filter(r => r !== responseType));
    } else {
      setResponseFilter([...responseFilter, responseType]);
    }
  };

  return (
    <Container>
      <StandardSearchSortBar value={searchTerm} onChangeText={setSearchTerm} />
      <Spacer size={5} />
      <LabelContainer>
        {['Total', ...guestResponseKeys].map(enumValue => {
          const isSelected = !responseFilter.includes(enumValue);
          const { text, color } = GuestResponse[enumValue] || { text: enumValue, color: Colours.neutral.grey3 };
          const statusCount = attendanceStats[enumValue];

          return (
            <StyledPressable
              key={enumValue}
              borderColor={color}
              selected={isSelected}
              onPress={() => toggleResponseFilter(enumValue)}
            >
              <Label>{text}</Label>
              <Spacer size={5} />
              <Count>{statusCount}</Count>
            </StyledPressable>
          );
        })}
      </LabelContainer>
    </Container>
  );
};

const Container = styled.View`
  padding-horizontal: 5%;
  margin-bottom: 25px;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledPressable = styled(StandardPressable).attrs({
  pressedStyle: {
    opacity: 0.75,
  },
})`
  flex-direction: row;
  align-self: flex-start;
  padding-vertical: 8px;
  padding-horizontal: 10px;
  margin-vertical: 5px;
  background-color: ${Theme.card};
  border: 2px solid ${props => (props.selected ? props.borderColor : 'transparent')};
  ${Outlines.borderRadius};
`;

const Label = styled.Text`
  ${Typography.small};
  font-size: 12px;
  color: ${Colours.neutral.white};
`;

const Count = styled.Text`
  ${Typography.small};
  font-size: 12px;
  color: ${Colours.neutral.grey3};
`;

export default InvitationFlatlistHeader;
