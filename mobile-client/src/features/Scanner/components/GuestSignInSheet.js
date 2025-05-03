import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { Colours, Theme, Typography } from 'library/styles';
import Spacer from 'library/components/Spacer';
import BottomSheetModal from 'library/components/BottomSheetModal';
import { useBottomSheetActionButton } from 'library/hooks';
import StandardActionButton from 'library/components/StandardActionButton';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import StandardRadioInput from 'library/components/StandardRadioInput';
import { useAlert, useAuth } from 'context';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';

const GuestSignInSheet = ({ active, onDismiss, guestCredentials }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sheetPosition, buttonAnimatedStyle } = useBottomSheetActionButton();
  const { signIn } = useAuth();
  const { showAlert } = useAlert();
  const accounts =
    guestCredentials?.map(credentials => ({
      _id: credentials.username,
      label: `${credentials.user.firstName} ${credentials.user.lastName}`,
      value: credentials,
    })) || [];

  const attemptLogin = async () => {
    try {
      setIsSubmitting(true);
      const { username, password } = selectedAccount;
      const signedIn = await signIn(username, password);

      if (!signedIn) {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      const { message } = parseError(error);
      console.error(message);
      showAlert({
        message,
        type: AlertType.WARNING,
      });
    }
  };

  return (
    <BottomSheetModal
      active={active}
      onDismiss={onDismiss}
      animatedIndex={sheetPosition}
      outerChildren={
        <StandardActionButton
          label='Login'
          icon={isSubmitting ? <ActivityIndicator color='#fff' /> : <StyledIcon name='log-in' size={22} />}
          containerStyle={{ zIndex: 99 }}
          style={buttonAnimatedStyle}
          onPress={attemptLogin}
        />
      }
    >
      <StyledBottomSheetScrollView>
        <Spacer size={15} />
        <ModalTitle>Guest Sign In 🤵🏻🙎🏽‍♀️</ModalTitle>
        <Spacer size={10} />
        <ModalSubtitle>Select your account from the list below to login!</ModalSubtitle>
        <Spacer size={45} />
        <StandardRadioInput
          options={accounts}
          setSelectedValue={value => setSelectedAccount(value)}
          selectedValue={selectedAccount}
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

export default GuestSignInSheet;
