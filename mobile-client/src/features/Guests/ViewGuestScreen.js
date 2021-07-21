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

const { height } = Dimensions.get('window');
const { BASE_API_URL } = Constants.manifest.extra;

const ViewGuestScreen = ({ route }) => {
  const { guest } = route?.params;
  const { firstName, lastName, attendanceStatus, rsvpForm, invitationId } = guest;
  const { text: guestStatus, color: statusColour } = GuestResponse[attendanceStatus];
  const fullName = `${firstName} ${lastName}`;

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
          value={`${BASE_API_URL}${invitationId}`}
          level='M'
          size={192}
          bgColor={Colours.neutral.offWhite}
          fgColor={Colours.neutral.offBlack}
        />
        <Spacer size={45} />
        <InfoText>Unique Code</InfoText>
        <UniqueCode>{invitationId}</UniqueCode>
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
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding-horizontal: 5%;
`;

const Header = styled.View`
  height: ${height * 0.25}px;
  ${Layout.flexCenter};
`;

const Name = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
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

export default ViewGuestScreen;
