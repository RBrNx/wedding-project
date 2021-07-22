import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import { QuestionType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { useNavigation } from '@react-navigation/native';
import Spacer from 'library/components/Spacer';
import { css } from 'styled-components/native';
import Color from 'color';

const QuestionCard = ({ question, index, followUp, requiredAnswer }) => {
  const { type, title, followUpQuestions, choices } = question;
  const { text: questionType, color: questionTypeColour } = QuestionType[type];
  const navigation = useNavigation();

  const getRequiredAnswer = (value, qType) => {
    if (choices) return choices.find(choice => choice.value === value)?.label;
    if (qType === QuestionType.TEXT.value) return value;
    if (qType === QuestionType.SONG_REQUEST.value) return value;

    return null;
  };

  return (
    <>
      <CardContainer raised followUp={followUp} onPress={() => {}}>
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
          <QuestionTypeLabel colour={questionTypeColour}>{questionType}</QuestionTypeLabel>
          {!!requiredAnswer && (
            <QuestionTypeLabel colour='#FFF5BA'>Requires answer: {requiredAnswer}</QuestionTypeLabel>
          )}
        </TextContainer>
        <StyledIcon name='chevron-right' size={30} />
      </CardContainer>
      <FollowUpContainer>
        <ConnectionLine />
        {followUpQuestions?.map(({ question: followUpQuestion, matchesValue: requiredValue }) => {
          const answer = getRequiredAnswer(requiredValue);

          return (
            <QuestionCard key={followUpQuestion._id} question={followUpQuestion} followUp requiredAnswer={answer} />
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

const QuestionTypeLabel = styled.Text`
  margin-vertical: 5px;
  ${Typography.small};
  ${Typography.boldFont};
  color: ${Theme.card};
  background-color: ${props => Color(props.colour).fade(0.25)};
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
