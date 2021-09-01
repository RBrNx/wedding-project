import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useAvoidKeyboard, useBottomSheetActionButton } from 'library/hooks';
import StandardActionButton from 'library/components/StandardActionButton';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType, InvitationType } from 'library/enums';
import { toOrdinalSuffix } from 'features/RSVP/helpers';
import StandardPressable from 'library/components/StandardPressable';
import CREATE_INVITATION from 'library/graphql/mutations/createInvitationGroup.graphql';
import useInvitationMutation from 'library/hooks/useInvitationMutation';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import FormInput from 'library/components/FormInput';

const CreateInvitationSheet = ({ active, onDismiss }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createInvitation] = useInvitationMutation(CREATE_INVITATION);
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();
  const formMethods = useForm({
    defaultValues: {
      type: null,
      guests: [{ firstName: null, lastName: null, hasPlusOne: false }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'guests',
  });
  const guests = useWatch({ control: formMethods.control, name: 'guests' });

  const resetState = () => {
    formMethods.reset();
    setIsSubmitting(false);
  };

  const createNewInvitation = async form => {
    try {
      setIsSubmitting(true);

      const { data } = await createInvitation({
        variables: { invitationGroup: { ...form } },
      });

      const { success } = data?.createInvitationGroup;

      if (success) {
        onDismiss();
        resetState();
      } else setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      const { message } = parseError(error);
      console.log(message);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const addGuest = () => {
    append({ firstName: null, lastName: null, hasPlusOne: false });
  };

  const removeGuest = guestIndex => {
    remove(guestIndex);
  };

  return (
    <BottomSheetModal
      active={active}
      onDismiss={onDismiss}
      animatedIndex={sheetPosition}
      outerChildren={
        <StandardActionButton
          label='Add Guest'
          icon={isSubmitting ? <ActivityIndicator color='#fff' /> : <StyledIcon name='save' size={22} />}
          containerStyle={{ zIndex: 99 }}
          style={buttonAnimatedStyle}
          onPress={formMethods.handleSubmit(createNewInvitation)}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Create an Invitation 💌</ModalTitle>
        <Spacer size={10} />
        <ModalSubtitle>Add multiple guests from a single household!</ModalSubtitle>
        <Spacer size={45} />
        <FormProvider {...formMethods}>
          <Card>
            <QuestionText>What type of invitation do they get?</QuestionText>
            <FormInput name='type' type='EnumSelect' enumObject={InvitationType} />
          </Card>
          <Spacer size={15} />
          {fields.map((guest, guestIndex) => {
            const label = `${toOrdinalSuffix(guestIndex + 1)} Guest`;

            return (
              <Card key={guest.id}>
                <ChoiceContainer>
                  <ModalSubtitle>{label}</ModalSubtitle>
                  <DeleteButton size={40} onPress={() => removeGuest(guestIndex)}>
                    <TrashIcon name='trash-2' size={25} />
                  </DeleteButton>
                </ChoiceContainer>
                <Spacer size={15} />
                <QuestionText>What is their first name?</QuestionText>
                <FormInput name={`guests.${guestIndex}.firstName`} label={`Guest's first name`} />
                <Spacer size={30} />
                <QuestionText>What is their last name?</QuestionText>
                <FormInput name={`guests.${guestIndex}.lastName`} label={`Guest's last name`} />
                <Spacer size={30} />
                <QuestionText>Are they allowed a Plus One?</QuestionText>
                <SwitchContainer>
                  <FormInput name={`guests.${guestIndex}.hasPlusOne`} type='Switch' />
                </SwitchContainer>
              </Card>
            );
          })}
        </FormProvider>
        <Spacer size={15} />
        {guests.length < 4 && (
          <AddGuestButton onPress={addGuest}>
            <AddGuestIcon name='plus' size={18} />
            <ButtonText>Add Guest</ButtonText>
          </AddGuestButton>
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

const Card = styled.View`
  width: 100%;
  padding: 5%;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const StyledIcon = styled(Feather)`
  color: ${Colours.neutral.white};
`;

const ModalTitle = styled.Text`
  ${Typography.h1};
  font-size: 28px;
  color: ${Theme.headerTextColour};
`;

const ModalSubtitle = styled.Text`
  ${Typography.h4};
  color: ${Theme.detailTextColour};
  ${Typography.regularFont};
  width: 90%;
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
  align-items: center;
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
  color: ${Theme.icon};
`;

const AddGuestButton = styled(StandardPressable).attrs(props => ({
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

const AddGuestIcon = styled(Feather)`
  color: ${Colours.secondary};
`;

const ButtonText = styled.Text`
  ${Typography.body};
  ${Typography.boldFont};
  color: ${Colours.secondary};
`;

const SwitchContainer = styled.View`
  width: 100%;
  align-items: flex-start;
`;

export default CreateInvitationSheet;
