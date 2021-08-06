import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import UserAvatar from 'react-native-user-avatar';
import Spacer from 'library/components/Spacer';
import QRCode from 'library/components/QRCode';
import { GuestResponse } from 'library/enums';
import StatusLine from 'library/components/StatusLine';
import DashedLine from 'react-native-dashed-line';
import theme from 'styled-theming';
import Constants from 'expo-constants';
import StandardButton from 'library/components/StandardButton';
import { darken } from 'library/utils/colours';
import useGuestMutation from 'library/hooks/useGuestMutation';
import DELETE_GUEST from 'library/graphql/mutations/deleteGuest.graphql';

const { height } = Dimensions.get('window');
const { BASE_API_URL } = Constants.manifest.extra;

const ViewGuestScreen = ({ route, navigation }) => {
  const [deleteGuest, { loading: deleteInProgress }] = useGuestMutation(DELETE_GUEST);
  const { guest, invitationCode } = route?.params;
  const { firstName, lastName, attendanceStatus, rsvpForm } = guest;
  const { text: guestStatus, color: statusColour } = GuestResponse[attendanceStatus];
  const fullName = `${firstName} ${lastName}`;

  const deleteCurrentGuest = async () => {
    await deleteGuest({ variables: { id: guest._id } });
    navigation.pop();
  };
  return (
    <Container>
      <Header>
        <UserAvatar size={75} name={fullName} />
        <Spacer size={25} />
        <Name>{fullName}</Name>
        <StatusContainer>
          <StyledStatus colour={statusColour} />
          <Spacer size={10} />
          <InvitationStatus>{guestStatus}</InvitationStatus>
        </StatusContainer>
      </Header>
      <Spacer size={15} />
      <InviteCard>
        <InfoText>Personalised QR Code</InfoText>
        <Spacer size={10} />
        <QRCode
          value={`${BASE_API_URL}${invitationCode}`}
          level='M'
          size={192}
          bgColor={Colours.neutral.offWhite}
          fgColor={Colours.neutral.offBlack}
        />
        <Spacer size={45} />
        <InfoText>Unique Code</InfoText>
        <UniqueCode selectable>{invitationCode}</UniqueCode>
      </InviteCard>
      <Spacer size={25} />
      {rsvpForm && (
        <Card>
          <Title>RSVP</Title>
          <Spacer size={25} />
          {rsvpForm?.map((rsvpTuple, index) => {
            const { question, answer } = rsvpTuple;

            return (
              <React.Fragment key={question._id}>
                <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
                <Spacer size={5} />
                <QuestionTitle>{question.title}</QuestionTitle>
                <Spacer size={20} />
                <AnswerText>{answer.label}</AnswerText>
                {index < rsvpForm.length - 1 && <StyledLine />}
              </React.Fragment>
            );
          })}
        </Card>
      )}
      <DeleteGuestButton text='Delete Guest' outline onPress={deleteCurrentGuest} loading={deleteInProgress} />
    </Container>
  );
};

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: '7.5%',
  },
}))`
  flex: 1;
  padding-horizontal: 5%;
`;

const Header = styled.View`
  ${Layout.flexCenter};
`;

const Name = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
  text-align: center;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  margin-vertical: 5px;
  align-items: center;
`;

const StyledStatus = styled(StatusLine)`
  height: 10px;
  width: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const InvitationStatus = styled.Text`
  ${Typography.small};
  color: ${Colours.neutral.grey2};
`;

const Card = styled.View`
  width: 100%;
  padding: 5%;
  margin-bottom: 10px;
  background-color: ${theme('theme', {
    light: Colours.neutral.offWhite,
    dark: Colours.neutral.grey5,
  })};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const InviteCard = styled(Card)`
  padding: 15%;
  align-items: center;
`;

const InfoText = styled.Text`
  ${Typography.regularFont}
  color: ${Colours.neutral.grey3};
  width: 100%;
  margin-left: 15px;
`;

const UniqueCode = styled.Text`
  ${Typography.h2};
  color: ${Theme.headerTextColour};
`;

const Title = styled.Text`
  ${Typography.h2};
  color: ${Theme.headerTextColour};
`;

const QuestionNumber = styled.Text`
  color: ${Colours.neutral.grey3};
  ${Typography.h3};
  ${Typography.regularFont};
`;

const QuestionTitle = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.h3};
  ${Typography.regularFont};
`;

const AnswerText = styled.Text`
  color: ${Colours.secondary};
  ${Typography.h3};
`;

const StyledLine = styled(DashedLine).attrs(props => ({
  dashColor: Theme.detailTextColour(props),
  dashLength: 6,
  dashThickness: 1,
  dashGap: 5,
}))`
  margin-vertical: 25px;
  overflow: hidden;
`;

const DeleteGuestButton = styled(StandardButton).attrs({
  pressedStyle: {
    backgroundColor: darken('red', 0.2),
  },
})`
  border-color: red;
`;

export default ViewGuestScreen;
