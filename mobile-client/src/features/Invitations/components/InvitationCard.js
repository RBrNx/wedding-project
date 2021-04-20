import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import StatusLine from 'library/components/StatusLine';
import { GuestResponse, InvitationType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';

const InvitationCard = ({ guests, uniqueCode = 12345, type }) => {
  const { icon: InvitationTypeIcon } = InvitationType[type];

  return (
    <CardContainer raised onPress={() => {}}>
      <CardHeader>
        <InvitationTypeIcon size={40} />
        <InvitationCode>{uniqueCode}</InvitationCode>
      </CardHeader>
      <CardBody>
        <GuestContainer>
          {guests.map((guest, guestIndex) => {
            const { firstName, lastName, attendanceStatus } = guest;
            const { color: statusColour } = GuestResponse[attendanceStatus];
            const isFirst = guestIndex === 0;
            const isLast = guestIndex === guests.length - 1;

            return (
              <Guest key={guest._id}>
                <StatusLine colour={statusColour} isFirst={isFirst} isLast={isLast} />
                <GuestName>
                  {firstName} {lastName}
                </GuestName>
              </Guest>
            );
          })}
        </GuestContainer>
        <StyledIcon name='chevron-right' size={30} />
      </CardBody>
    </CardContainer>
  );
};

const CardContainer = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colours.neutral.grey1};
`;

const InvitationCode = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  margin-vertical: 5px;
  padding-left: 5px;
  color: ${Theme.headerTextColour};
`;

const CardBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GuestContainer = styled.View`
  flex: 1;
  padding-top: 12px;
`;

const Guest = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  margin-vertical: 2px;
`;

const GuestName = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  margin-vertical: 15px;
  padding-left: 20px;
  color: ${Theme.headerTextColour};
`;

const StyledIcon = styled(Feather).attrs(props => ({
  color: Theme.icon(props),
}))``;

export default InvitationCard;
