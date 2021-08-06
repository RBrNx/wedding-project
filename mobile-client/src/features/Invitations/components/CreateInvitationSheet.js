import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import StandardTextInput from 'library/components/StandardTextInput';
import { useAvoidKeyboard, useBottomSheetActionButton } from 'library/hooks';
import StandardActionButton from 'library/components/StandardActionButton';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType, InvitationType } from 'library/enums';
import EnumLabel from 'features/RSVP/components/EnumLabel';
import { toOrdinalSuffix } from 'features/RSVP/helpers';
import StandardPressable from 'library/components/StandardPressable';
import { nanoid } from 'nanoid';
import CREATE_INVITATION from 'library/graphql/mutations/createInvitationGroup.graphql';
import useInvitationMutation from 'library/hooks/useInvitationMutation';

const CreateInvitationSheet = ({ active, onDismiss }) => {
  const [invitationType, setInvitationType] = useState(null);
  const [guests, setGuests] = useState({ [nanoid()]: { firstName: null, lastName: null } });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createInvitation] = useInvitationMutation(CREATE_INVITATION);
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();
  const { keyboardHeight } = useAvoidKeyboard();

  const resetState = () => {
    setGuests([{ firstName: null, lastName: null }]);
    setInvitationType(null);
    setIsSubmitting(false);
  };

  const createNewInvitation = async () => {
    try {
      setIsSubmitting(true);
      const guestsArray = [...Object.values(guests).map(guest => ({ ...guest }))];

      const { data } = await createInvitation({
        variables: { invitationGroup: { type: invitationType, guests: guestsArray } },
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
    setGuests({
      ...guests,
      [nanoid()]: { firstName: null, lastName: null },
    });
  };

  const removeGuest = guestId => {
    const filteredGuests = Object.fromEntries(Object.entries(guests).filter(([id]) => id !== guestId));
    setGuests(filteredGuests);
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
          onPress={createNewInvitation}
        />
      }
    >
      <StyledBottomSheetScrollView keyboardHeight={keyboardHeight}>
        <Spacer size={15} />
        <ModalTitle>Create an Invitation 💌</ModalTitle>
        <Spacer size={10} />
        <ModalSubtitle>Add multiple guests from a single household!</ModalSubtitle>
        <Spacer size={45} />
        <Card>
          <QuestionText>What type of invitation do they get?</QuestionText>
          <InvitationTypeContainer>
            {Object.keys(InvitationType).map(type => {
              const isSelected = type === invitationType;
              return (
                <EnumLabel
                  key={type}
                  type={type}
                  selected={isSelected}
                  onPress={() => setInvitationType(type)}
                  enumObject={InvitationType}
                />
              );
            })}
          </InvitationTypeContainer>
        </Card>
        <Spacer size={15} />
        {Object.entries(guests).map(([guestId, guest], index) => {
          const label = `${toOrdinalSuffix(index + 1)} Guest`;
          const { firstName, lastName } = guest;

          return (
            <Card key={guestId}>
              <ChoiceContainer>
                <ModalSubtitle>{label}</ModalSubtitle>
                <DeleteButton size={40} onPress={() => removeGuest(guestId)}>
                  <TrashIcon name='trash-2' size={25} />
                </DeleteButton>
              </ChoiceContainer>
              <Spacer size={15} />
              <QuestionText>What is their first name?</QuestionText>
              <StandardTextInput
                value={firstName}
                label={`Guest's first name`}
                onChangeText={value =>
                  setGuests({
                    ...guests,
                    [guestId]: { ...guests[guestId], firstName: value },
                  })
                }
                themeColourOverride='#fff'
              />
              <Spacer size={30} />
              <QuestionText>What is their last name?</QuestionText>
              <StandardTextInput
                value={lastName}
                label={`Guest's last name`}
                onChangeText={value =>
                  setGuests({
                    ...guests,
                    [guestId]: { ...guests[guestId], lastName: value },
                  })
                }
                themeColourOverride='#fff'
              />
            </Card>
          );
        })}
        <Spacer size={15} />
        {Object.keys(guests).length < 4 && (
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

const InvitationTypeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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

export default CreateInvitationSheet;
