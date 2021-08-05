import React from 'react';
import styled from 'styled-components/native';
import { InvitationType } from 'library/enums';
import { Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import GuestCard from 'features/Guests/components/GuestCard';
import { listNames } from '../helpers';

const InvitationCard = ({ invitation }) => {
  const { guests, type, invitationCode } = invitation;
  const { icon: InvitationTypeIcon } = InvitationType[type];

  return (
    <>
      <CardContainer raised onPress={() => {}}>
        <CardHeader>
          <InvitationTypeIcon size={40} />
          <InvitationCode>{listNames(guests.map(guest => guest.firstName))}</InvitationCode>
        </CardHeader>
      </CardContainer>
      <FollowUpContainer>
        <ConnectionLine />
        {guests.map(guest => (
          <StyledGuestCard guest={guest} invitationCode={invitationCode} key={guest._id} />
        ))}
      </FollowUpContainer>
      <Spacer size={20} />
    </>
  );
};

const CardContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const FollowUpContainer = styled.View`
  position: relative;
`;

const ConnectionLine = styled.View`
  height: 100%;
  width: 5px;
  position: absolute;
  top: -10px;
  left: 15%;
  background-color: ${Theme.icon};
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InvitationCode = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  margin-vertical: 5px;
  padding-left: 5px;
  color: ${Theme.headerTextColour};
`;

const StyledGuestCard = styled(GuestCard)`
  width: 95%;
  margin-left: 5%;
`;

export default InvitationCard;
