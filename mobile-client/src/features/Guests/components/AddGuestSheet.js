import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import StandardTextInput from 'library/components/StandardTextInput';
import { useBottomSheetActionButton } from 'library/hooks';
import StandardActionButton from 'library/components/StandardActionButton';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CREATE_GUEST from 'library/graphql/mutations/createGuest.graphql';
import { useMutation } from '@apollo/react-hooks';
import parseError from 'library/utils/parseError';
import { useAlert } from 'context';
import { AlertType } from 'library/enums';
import ALL_GUESTS_QUERY from 'library/graphql/queries/getAllGuests.graphql';
import { getOperationName } from 'apollo-link';

const AddGuestSheet = ({ active, onDismiss }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createGuest] = useMutation(CREATE_GUEST, {
    refetchQueries: [getOperationName(ALL_GUESTS_QUERY)],
    awaitRefetchQueries: true,
  });
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { showAlert } = useAlert();

  const resetState = () => {
    setFirstName(null);
    setLastName(null);
    setIsSubmitting(false);
  };

  const addNewGuest = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await createGuest({ variables: { guest: { firstName, lastName } } });

      const { success } = data?.createGuest;

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
          onPress={addNewGuest}
        />
      }
    >
      <StyledBottomSheetScrollView>
        <Spacer size={15} />
        <ModalTitle>Add a Guest 🤵🏻🙎🏽‍♀️</ModalTitle>
        <Spacer size={10} />
        <ModalSubtitle>We only need a few details!</ModalSubtitle>
        <Spacer size={45} />
        <QuestionText>What is their first name?</QuestionText>
        <StandardTextInput
          value={firstName}
          label={`Guest's first name`}
          onChangeText={value => setFirstName(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is their last name?</QuestionText>
        <StandardTextInput
          value={lastName}
          label={`Guest's last name`}
          onChangeText={value => setLastName(value)}
          themeColourOverride='#fff'
        />
      </StyledBottomSheetScrollView>
    </BottomSheetModal>
  );
};

const StyledBottomSheetScrollView = styled(BottomSheetScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
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

export default AddGuestSheet;
