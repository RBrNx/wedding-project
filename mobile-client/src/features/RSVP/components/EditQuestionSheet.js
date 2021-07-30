import React, { useState, useEffect } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import StandardTextInput from 'library/components/StandardTextInput';
import { useBottomSheetActionButton, useQuestionMutation } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType, QuestionType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import { nanoid } from 'nanoid';
import CREATE_QUESTION from 'library/graphql/mutations/createQuestion.graphql';
import UPDATE_QUESTION from 'library/graphql/mutations/updateQuestion.graphql';
import DELETE_QUESTION from 'library/graphql/mutations/deleteQuestion.graphql';
import StandardButton from 'library/components/StandardButton';
import { darken } from 'library/utils/colours';
import { ActivityIndicator } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import StandardSelectInput from 'library/components/StandardSelectInput';
import QuestionTypeLabel from './QuestionTypeLabel';
import { toOrdinalSuffix } from '../helpers';

const EditQuestionSheet = ({ active, onDismiss, editMode, question, isFollowUpQuestion, parentQuestion }) => {
  const [questionType, setQuestionType] = useState(null);
  const [questionTitle, setQuestionTitle] = useState(null);
  const [questionOrder, setQuestionOrder] = useState(null);
  const [attendingLabel, setAttendingLabel] = useState(null);
  const [decliningLabel, setDecliningLabel] = useState(null);
  const [questionChoices, setQuestionChoices] = useState({});
  const [answerRequired, setAnswerRequired] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createQuestion] = useQuestionMutation(CREATE_QUESTION);
  const [updateQuestion] = useQuestionMutation(UPDATE_QUESTION);
  const [deleteQuestion, { loading: deleteInProgress }] = useQuestionMutation(DELETE_QUESTION);
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const questionChoiceKeys = Object.keys(questionChoices);

  useEffect(() => {
    if (active && editMode) {
      setQuestionType(question.type);
      setQuestionTitle(question.title);
      setQuestionOrder(question.order.toString());
      setAttendingLabel(question.choices.find(choice => choice.value === 'ATTENDING')?.label);
      setDecliningLabel(question.choices.find(choice => choice.value === 'NOT_ATTENDING')?.label);

      if (isFollowUpQuestion) {
        setAnswerRequired(question.requiredAnswer);
      }

      if (question.choices.length) {
        const qChoices = {};

        question.choices
          .filter(choice => !['ATTENDING', 'NOT_ATTENDING'].includes(choice.value))
          .forEach((choice, index) => {
            qChoices[choice._id] = { value: choice.label, order: index };
          });
        setQuestionChoices(qChoices);
      }
    }
  }, [active, editMode]);

  const onSheetDismiss = () => {
    resetState();
    onDismiss();
  };

  const resetState = () => {
    setQuestionType(null);
    setQuestionTitle(null);
    setQuestionOrder(null);
    setAttendingLabel(null);
    setDecliningLabel(null);
    setAnswerRequired(null);
    setQuestionChoices({});
    setIsSubmitting(false);
  };

  const addQuestionChoice = () => {
    setQuestionChoices({
      ...questionChoices,
      [nanoid()]: { value: null, order: questionChoiceKeys.length },
    });
  };

  const removeQuestionChoice = choiceId => {
    const filteredChoices = Object.fromEntries(Object.entries(questionChoices).filter(([id]) => id !== choiceId));
    setQuestionChoices(filteredChoices);
  };

  const createRSVPQuestion = async () => {
    try {
      setIsSubmitting(true);
      const choices = [
        ...(questionType === QuestionType.ATTENDANCE.value
          ? [
              { value: 'ATTENDING', label: attendingLabel },
              { value: 'NOT_ATTENDING', label: decliningLabel },
            ]
          : []),
        ...Object.values(questionChoices)
          .sort((a, b) => a.order - b.order)
          .map((choice, index) => ({ label: choice.value, value: `${index}` })),
      ];
      const { data } = await createQuestion({
        variables: {
          question: {
            type: questionType,
            title: questionTitle,
            order: parseInt(questionOrder),
            choices,
            isFollowUp: isFollowUpQuestion,
            responseType: 'INDIVIDUAL',
          },
        },
      });
      const { success, payload } = data?.createQuestion;

      if (success && isFollowUpQuestion) {
        await updateQuestion({
          variables: {
            id: parentQuestion._id,
            question: {
              followUpQuestions: [
                {
                  question: payload._id,
                  matchesValue: answerRequired.value,
                },
              ],
            },
          },
        });
      }

      onSheetDismiss();
    } catch (error) {
      setIsSubmitting(false);
      const { message } = parseError(error);
      console.log(message, error);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const updateRSVPQuestion = async () => {
    try {
      setIsSubmitting(true);
      const choices = [
        ...(questionType === QuestionType.ATTENDANCE.value
          ? [
              { value: 'ATTENDING', label: attendingLabel },
              { value: 'NOT_ATTENDING', label: decliningLabel },
            ]
          : []),
        ...Object.values(questionChoices)
          .sort((a, b) => a.order - b.order)
          .map((choice, index) => ({ label: choice.value, value: `${index}` })),
      ];
      await updateQuestion({
        variables: {
          id: question._id,
          question: {
            type: questionType,
            title: questionTitle,
            order: parseInt(questionOrder),
            choices,
            isFollowUp: question.isFollowUp,
          },
        },
      });

      if (isFollowUpQuestion) {
        await updateQuestion({
          variables: {
            id: parentQuestion._id,
            question: {
              followUpQuestions: [
                {
                  question: question._id,
                  matchesValue: answerRequired.value,
                },
              ],
            },
          },
        });
      }

      onSheetDismiss();
    } catch (error) {
      setIsSubmitting(false);
      const { message } = parseError(error);
      console.log(message, error);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const deleteRSVPQuestion = async () => {
    await deleteQuestion({ variables: { id: question._id } });
    onSheetDismiss();
  };

  return (
    <BottomSheetModal
      active={active}
      onDismiss={onSheetDismiss}
      animatedIndex={sheetPosition}
      outerChildren={
        <StandardActionButton
          label='Save Question'
          icon={isSubmitting ? <ActivityIndicator color='#fff' /> : <StyledIcon name='save' size={22} />}
          containerStyle={{ zIndex: 99 }}
          style={buttonAnimatedStyle}
          onPress={editMode ? updateRSVPQuestion : createRSVPQuestion}
        />
      }
    >
      <StyledBottomSheetScrollView>
        <Spacer size={15} />
        <ModalTitle>{editMode ? 'Edit' : 'Add'} RSVP Question 🎩</ModalTitle>
        <Spacer size={45} />

        <Card>
          <QuestionText>Question Type</QuestionText>
          <QuestionTypeContainer>
            {Object.keys(QuestionType).map(type => {
              if (type === 'SONG_REQUEST') return null;

              const isSelected = type === questionType;
              return (
                <StyledQuestionType
                  key={type}
                  type={type}
                  selected={isSelected}
                  onPress={() => setQuestionType(type)}
                />
              );
            })}
          </QuestionTypeContainer>

          <Spacer size={30} />
          <QuestionText>What is the title of your question?</QuestionText>
          <StandardTextInput
            label='Question Title'
            value={questionTitle}
            onChangeText={value => setQuestionTitle(value)}
            themeColourOverride='#fff'
          />
          <Spacer size={30} />
          <QuestionText>What is the order of this question?</QuestionText>
          <StandardTextInput
            label='Question Order'
            value={questionOrder}
            onChangeText={value => setQuestionOrder(value)}
            themeColourOverride='#fff'
          />
          {isFollowUpQuestion && (
            <>
              <Spacer size={30} />
              <QuestionText>What answer to the parent question do you require?</QuestionText>
              <StandardSelectInput
                label='Answer Required'
                value={answerRequired}
                options={parentQuestion.choices}
                onChange={value => setAnswerRequired(value)}
              />
            </>
          )}
        </Card>
        <Spacer size={15} />
        {[QuestionType.ATTENDANCE.value, QuestionType.MULTIPLE_CHOICE.value].includes(questionType) && (
          <Card>
            {questionType === QuestionType.ATTENDANCE.value && (
              <>
                <QuestionText>What is your Attending label?</QuestionText>
                <StandardTextInput
                  label='Attending answer'
                  value={attendingLabel}
                  onChangeText={value => setAttendingLabel(value)}
                  themeColourOverride='#fff'
                />
                <Spacer size={30} />
                <QuestionText>What is your Declining label?</QuestionText>
                <StandardTextInput
                  label='Declining answer'
                  value={decliningLabel}
                  onChangeText={value => setDecliningLabel(value)}
                  themeColourOverride='#fff'
                />
              </>
            )}
            {Object.entries(questionChoices)
              .sort(([, a], [, b]) => a.order - b.order)
              .map(([choiceId], index) => {
                const startIndex = questionType === QuestionType.ATTENDANCE.value ? index + 2 : index;
                const label = `${toOrdinalSuffix(startIndex + 1)} choice`;
                const inputValue = questionChoices[choiceId].value;

                return (
                  <React.Fragment key={choiceId}>
                    <Spacer size={30} />
                    <ChoiceContainer>
                      <ChoiceInput
                        label={label}
                        value={inputValue}
                        onChangeText={value =>
                          setQuestionChoices({
                            ...questionChoices,
                            [choiceId]: { ...questionChoices[choiceId], value },
                          })
                        }
                        themeColourOverride='#fff'
                      />
                      <DeleteButton size={40} onPress={() => removeQuestionChoice(choiceId)}>
                        <TrashIcon name='trash-2' size={25} />
                      </DeleteButton>
                    </ChoiceContainer>
                  </React.Fragment>
                );
              })}
            <Spacer size={15} />
            {questionChoiceKeys.length < 5 && (
              <AddChoiceButton onPress={addQuestionChoice}>
                <AddChoiceIcon name='plus' size={18} />
                <ButtonText>Add Choice</ButtonText>
              </AddChoiceButton>
            )}
            <Spacer size={15} />
          </Card>
        )}
        <Spacer size={15} />
        {editMode && (
          <DeleteQuestionButton
            text='Delete Question'
            outline
            onPress={deleteRSVPQuestion}
            loading={deleteInProgress}
          />
        )}
      </StyledBottomSheetScrollView>
    </BottomSheetModal>
  );
};

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
}))``;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

const ModalTitle = styled.Text`
  ${Typography.h1};
  font-size: 28px;
  color: ${Theme.headerTextColour};
`;

const Card = styled.View`
  width: 100%;
  padding: 5%;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const StyledQuestionType = styled(QuestionTypeLabel)`
  border: 2px solid ${props => (props.selected ? Theme.detailTextColour : 'transparent')};
`;

const QuestionText = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 5px;
`;

const QuestionTypeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChoiceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChoiceInput = styled(StandardTextInput)`
  flex: 1;
`;

const DeleteButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const TrashIcon = styled(Feather)`
  color: ${Theme.detailTextColour};
`;

const AddChoiceIcon = styled(Feather)`
  color: ${Colours.secondary};
`;

const AddChoiceButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  align-items: center;
  align-self: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  ${Outlines.borderRadius};
`;

const ButtonText = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

const DeleteQuestionButton = styled(StandardButton).attrs({
  pressedStyle: {
    backgroundColor: darken('red', 0.2),
  },
})`
  border-color: red;
`;

export default EditQuestionSheet;
