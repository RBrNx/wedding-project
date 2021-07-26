import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import { QuestionType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import Spacer from 'library/components/Spacer';
import { css } from 'styled-components/native';
import QuestionTypeLabel from './QuestionTypeLabel';

const QuestionCard = ({ question, index, followUp, requiredAnswer, onPress }) => {
  const { type, title, followUpQuestions, choices } = question;

  const getRequiredAnswer = (value, qType) => {
    if (choices) return choices.find(choice => choice.value === value)?.label;
    if (qType === QuestionType.TEXT.value) return value;
    if (qType === QuestionType.SONG_REQUEST.value) return value;

    return null;
  };

  return (
    <>
      <CardContainer raised followUp={followUp} onPress={() => onPress(question)}>
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
          <QuestionTypeLabel type={type} title={title} />
          {!!requiredAnswer && <RequiredAnswer>Requires answer: {requiredAnswer}</RequiredAnswer>}
        </TextContainer>
        <StyledIcon name='chevron-right' size={30} />
      </CardContainer>
      <FollowUpContainer>
        <ConnectionLine />
        {followUpQuestions?.map(({ question: followUpQuestion, matchesValue: requiredValue }) => {
          const answer = getRequiredAnswer(requiredValue);

          return (
            <QuestionCard
              key={followUpQuestion._id}
              question={followUpQuestion}
              followUp
              requiredAnswer={answer}
              onPress={() => onPress(followUpQuestion)}
            />
          );
        })}
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
  color: ${Theme.card};
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
  background-color: ${Theme.detailTextColour};
`;

export default QuestionCard;
