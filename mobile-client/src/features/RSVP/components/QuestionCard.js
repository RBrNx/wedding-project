import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import { QuestionGuestType, QuestionType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import Spacer from 'library/components/Spacer';
import { css } from 'styled-components/native';
import EnumLabel from 'library/components/EnumLabel';
import { getRequiredAnswer } from '../helpers';

const QuestionCard = ({ question, parentQuestion, index, followUp, requiredAnswer, onPress, onAddFollowUp }) => {
  const { type, title, followUpQuestions, guestType } = question;
  const followUpTypes = [QuestionType.ATTENDANCE.value, QuestionType.MULTIPLE_CHOICE.value];

  return (
    <>
      <CardContainer
        raised
        followUp={followUp}
        onPress={() => onPress({ ...question, requiredAnswer }, parentQuestion)}
      >
        <TextContainer>
          <QuestionTitle>
            {index !== undefined && (
              <>
                <QuestionNumber>{`Q${index + 1}`}</QuestionNumber>
                <Spacer size={5} />
              </>
            )}
            {title}
          </QuestionTitle>
          <Spacer size={10} />
          <EnumLabel type={type} enumObject={QuestionType} />
          {guestType !== 'BOTH' && <EnumLabel type={guestType} enumObject={QuestionGuestType} />}
          {!!requiredAnswer && <RequiredAnswer>{requiredAnswer.label}</RequiredAnswer>}
        </TextContainer>
        <StyledIcon name='chevron-right' size={30} />
      </CardContainer>
      <FollowUpContainer>
        <ConnectionLine />
        {followUpQuestions
          ?.sort(({ question: a }, { question: b }) => a.order - b.order)
          .map(({ question: followUpQuestion, matchesValue: requiredValue }) => {
            const answer = getRequiredAnswer(question, requiredValue);

            return (
              <QuestionCard
                key={followUpQuestion._id}
                question={followUpQuestion}
                parentQuestion={question}
                followUp
                requiredAnswer={answer}
                onPress={onPress}
              />
            );
          })}
        {!followUp && followUpTypes.includes(type) && (
          <Card onPress={() => onAddFollowUp(question)}>
            <AddFollowUpIcon name='plus' size={18} />
            <ButtonText>Add Follow Up Question</ButtonText>
          </Card>
        )}
      </FollowUpContainer>
    </>
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
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${props =>
    props.followUp &&
    css`
      width: 95%;
      margin-left: 5%;
    `}
`;

const TextContainer = styled.View`
  flex: 1;
  padding-left: 5px;
`;

const QuestionTitle = styled.Text`
  margin-vertical: 5px;
  ${Typography.h4};
  ${Typography.boldFont};
  color: ${Theme.headerTextColour};
`;

const QuestionNumber = styled.Text`
  margin-vertical: 5px;
  ${Typography.h4};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

const RequiredAnswer = styled.Text`
  margin-vertical: 5px;
  ${Typography.small};
  ${Typography.boldFont};
  color: ${Colours.neutral.grey5};
  background-color: #fff5ba;
  text-align: center;
  padding-vertical: 2.5px;
  padding-horizontal: 10px;
  align-self: flex-start;
  ${Outlines.borderRadius};
`;

const StyledIcon = styled(Feather).attrs(props => ({
  color: Theme.icon(props),
}))``;

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

const Card = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  width: 95%;
  margin-left: 5%;
  padding: 5%;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Layout.flexCenter};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const AddFollowUpIcon = styled(Feather)`
  color: ${Colours.secondary};
`;

const ButtonText = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

export default QuestionCard;
