import React, { useState, useEffect } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useAvoidKeyboard, useBottomSheetActionButton, useQuestionMutation } from 'library/hooks';
import { Feather } from '@expo/vector-icons';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType, QuestionGuestType, QuestionType } from 'library/enums';
import StandardPressable from 'library/components/StandardPressable';
import CREATE_QUESTION from 'library/graphql/mutations/createQuestion.graphql';
import UPDATE_QUESTION from 'library/graphql/mutations/updateQuestion.graphql';
import DELETE_QUESTION from 'library/graphql/mutations/deleteQuestion.graphql';
import StandardButton from 'library/components/StandardButton';
import { darken } from 'library/utils/colours';
import { ActivityIndicator } from 'react-native';
import StandardActionButton from 'library/components/StandardActionButton';
import { useFieldArray, useForm, useWatch, FormProvider } from 'react-hook-form';
import FormInput from 'library/components/FormInput';
import { toOrdinalSuffix } from '../helpers';

const EditQuestionSheet = ({ active, onDismiss, editMode, question, isFollowUpQuestion, parentQuestion }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createQuestion] = useQuestionMutation(CREATE_QUESTION);
  const [updateQuestion] = useQuestionMutation(UPDATE_QUESTION);
  const [deleteQuestion, { loading: deleteInProgress }] = useQuestionMutation(DELETE_QUESTION);
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();
  const formMethods = useForm({
    defaultValues: {
      question: {
        type: null,
        title: null,
        guestType: null,
        order: null,
        choices: [{ value: null, order: 0 }],
      },
      attendingLabel: null,
      decliningLabel: null,
      parentAnswerRequired: null,
    },
  });
  const { fields: questionChoices, append, remove } = useFieldArray({
    control: formMethods.control,
    name: `question.choices`,
  });
  const questionType = useWatch({ control: formMethods.control, name: 'question.type' });

  useEffect(() => {
    if (active && editMode) {
      formMethods.setValue('question.type', question.type);
      formMethods.setValue('question.title', question.title);
      formMethods.setValue('question.guestType', question.guestType);
      formMethods.setValue('question.order', question.order.toString());
      formMethods.setValue('attendingLabel', question.choices.find(choice => choice.value === 'ATTENDING')?.label);
      formMethods.setValue('decliningLabel', question.choices.find(choice => choice.value === 'NOT_ATTENDING')?.label);

      if (isFollowUpQuestion) {
        formMethods.setValue('parentAnswerRequired', question.requiredAnswer);
      }

      if (question.choices.length) {
        const qChoices = question.choices
          .filter(choice => !['ATTENDING', 'NOT_ATTENDING'].includes(choice.value))
          .map((choice, index) => ({ value: choice.label, order: index }));

        formMethods.setValue('question.choices', qChoices);
      }
    }
  }, [active, editMode]);

  const onSheetDismiss = () => {
    onDismiss();
    resetState();
  };

  const resetState = () => {
    formMethods.reset();
    setIsSubmitting(false);
  };

  const addQuestionChoice = () => {
    append({ value: null, order: questionChoices.length });
  };

  const removeQuestionChoice = choiceIndex => {
    remove(choiceIndex);
  };

  const createRSVPQuestion = async form => {
    const { question: formQuestion, attendingLabel, decliningLabel, parentAnswerRequired } = form;

    try {
      setIsSubmitting(true);
      const choices = [
        ...(formQuestion.guestType === QuestionType.ATTENDANCE.value
          ? [
              { value: 'ATTENDING', label: attendingLabel },
              { value: 'NOT_ATTENDING', label: decliningLabel },
            ]
          : []),
        ...formQuestion.choices
          .sort((a, b) => a.order - b.order)
          .map((choice, index) => ({ label: choice.value, value: `${index}` })),
      ];
      const { data } = await createQuestion({
        variables: {
          question: {
            type: formQuestion.type,
            title: formQuestion.title,
            order: parseInt(formQuestion.order, 10),
            choices,
            isFollowUp: isFollowUpQuestion,
            responseType: 'INDIVIDUAL',
            guestType: formQuestion.guestType,
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
                  matchesValue: parentAnswerRequired.value,
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

  const updateRSVPQuestion = async form => {
    const { question: formQuestion, attendingLabel, decliningLabel, parentAnswerRequired } = form;

    try {
      setIsSubmitting(true);
      const choices = [
        ...(formQuestion.type === QuestionType.ATTENDANCE.value
          ? [
              { value: 'ATTENDING', label: attendingLabel },
              { value: 'NOT_ATTENDING', label: decliningLabel },
            ]
          : []),
        ...formQuestion.choices
          .sort((a, b) => a.order - b.order)
          .map((choice, index) => ({ label: choice.value, value: `${index}` })),
      ];

      await updateQuestion({
        variables: {
          id: question._id,
          question: {
            type: formQuestion.type,
            title: formQuestion.title,
            order: parseInt(formQuestion.order, 10),
            choices,
            isFollowUp: question.isFollowUp,
            guestType: formQuestion.guestType,
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
                  matchesValue: parentAnswerRequired.value,
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
          onPress={formMethods.handleSubmit(editMode ? updateRSVPQuestion : createRSVPQuestion)}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight} keyboardShouldPersistTaps='handled'>
        <Spacer size={15} />
        <ModalTitle>{editMode ? 'Edit' : 'Add'} RSVP Question 🎩</ModalTitle>
        <Spacer size={45} />
        <FormProvider {...formMethods}>
          <Card>
            <QuestionText>Question Type</QuestionText>
            <FormInput
              name='question.type'
              type='EnumSelect'
              enumObject={QuestionType}
              rules={{ required: 'Please select a Question Type' }}
            />
            <Spacer size={30} />
            <QuestionText>Guest Type</QuestionText>
            <FormInput
              name='question.guestType'
              type='EnumSelect'
              enumObject={QuestionGuestType}
              rules={{ required: 'Please select a Guest Type' }}
            />
            <Spacer size={30} />
            <QuestionText>What is the title of your question?</QuestionText>
            <FormInput
              name='question.title'
              label='Question Title'
              maxLength={250}
              rules={{ required: 'Please enter a Question Title' }}
            />
            <Spacer size={30} />
            <QuestionText>What is the order of this question?</QuestionText>
            <FormInput
              name='question.order'
              label='Question Order'
              keyboardType='numeric'
              maxLength={2}
              rules={{ required: 'Please enter a Question Order' }}
            />
            {isFollowUpQuestion && (
              <>
                <Spacer size={30} />
                <QuestionText>What answer to the parent question do you require?</QuestionText>
                <FormInput
                  name='parentAnswerRequired'
                  type='Select'
                  label='Answer Required'
                  options={parentQuestion.choices}
                  rules={{ required: 'Please select an answer' }}
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
                  <FormInput
                    name='attendingLabel'
                    label='Attending answer'
                    maxLength={100}
                    rules={{ required: 'Please enter an Attending Label' }}
                  />
                  <Spacer size={30} />
                  <QuestionText>What is your Declining label?</QuestionText>
                  <FormInput
                    name='decliningLabel'
                    label='Declining answer'
                    maxLength={100}
                    rules={{ required: 'Please enter a Declining Label' }}
                  />
                </>
              )}
              {questionChoices
                .sort((a, b) => a.order - b.order)
                .map((choice, index) => {
                  const startIndex = questionType === QuestionType.ATTENDANCE.value ? index + 2 : index;
                  const label = `${toOrdinalSuffix(startIndex + 1)} choice`;

                  return (
                    <React.Fragment key={choice.id}>
                      {startIndex >= 1 && <Spacer size={30} />}
                      <ChoiceContainer>
                        <ChoiceFormInput
                          name={`question.choices.${index}.value`}
                          label={label}
                          rules={{ required: 'Please enter a value for this Choice' }}
                        />
                        <DeleteButton size={40} onPress={() => removeQuestionChoice(index)}>
                          <TrashIcon name='trash-2' size={25} />
                        </DeleteButton>
                      </ChoiceContainer>
                    </React.Fragment>
                  );
                })}
              <Spacer size={20} />
              {questionChoices.length < 5 && (
                <AddChoiceButton onPress={addQuestionChoice}>
                  <AddChoiceIcon name='plus' size={18} />
                  <ButtonText>Add Choice</ButtonText>
                </AddChoiceButton>
              )}
              <Spacer size={15} />
            </Card>
          )}
        </FormProvider>
        <Spacer size={15} />
        {editMode && (
          <DeleteQuestionButton
            text='Delete Question'
            outline
            onPress={deleteRSVPQuestion}
            loading={deleteInProgress}
          />
        )}
        <Spacer size={15} />
      </StyledBottomSheetScrollView>
    </BottomSheetModal>
  );
};

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: props.keyboardHeight,
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

const QuestionText = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 5px;
`;

const ChoiceContainer = styled.View`
  flex-direction: row;
`;

const ChoiceFormInput = styled(FormInput)`
  flex: 1;
`;

const DeleteButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  margin-top: 10px;
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const TrashIcon = styled(Feather)`
  color: ${Theme.icon};
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

const DeleteQuestionButton = styled(StandardButton).attrs(props => ({
  pressedStyle: {
    backgroundColor: darken('red', 0.2),
  },
  textStyle: {
    color: Theme.headerTextColour(props),
  },
}))`
  border-color: red;
`;

export default EditQuestionSheet;
