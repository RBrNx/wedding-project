import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components';
import { Outlines, Theme, Typography } from 'library/styles';
import { GuestResponse } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import StatusLine from 'library/components/StatusLine';
import { useNavigation } from '@react-navigation/native';

const GuestCard = ({ guest, invitationCode, style }) => {
  const { firstName, lastName, attendanceStatus } = guest;
  const { text: guestStatus, color: statusColour } = GuestResponse[attendanceStatus];
  const navigation = useNavigation();

  return (
    <CardContainer raised onPress={() => navigation.navigate('ViewGuest', { guest, invitationCode })} style={style}>
      <StatusLine colour={statusColour} />
      <TextContainer>
        <GuestName>
          {firstName} {lastName}
        </GuestName>
        <InvitationStatus>{guestStatus}</InvitationStatus>
      </TextContainer>
      <StyledIcon name='chevron-right' size={30} />
    </CardContainer>
  );
};

const CardContainer = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
`;

const TextContainer = styled.View`
  flex: 100%;
  padding-left: 15px;
`;

const GuestName = styled.Text`
  margin-vertical: 5px;
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Theme.headerTextColour};
`;

const InvitationStatus = styled.Text`
  margin-vertical: 5px;
  ${Typography.small};
  color: ${Theme.detailTextColour};
`;

const StyledIcon = styled(Feather).attrs(props => ({
  color: Theme.icon(props),
}))``;

export default GuestCard;
