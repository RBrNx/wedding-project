import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import StandardButton from '../library/components/StandardButton';
import { useAuth } from '../context';
import DismissKeyboard from '../library/components/DismissKeyboard';
import { useAlert } from '../context/Alert';
import { AlertType } from '../library/enums';
import Spacer from '../library/components/Spacer';
import StandardTextInput from '../library/components/StandardTextInput';
import AppVersion from '../library/components/AppVersion';
import { Colours, Typography } from '../styles';

const SignInScreen = () => {
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  const { signIn } = useAuth();
  const { showAlert } = useAlert();

  const attemptLogin = async () => {
    try {
      setSigningIn(true);
      const signedIn = await signIn(emailAddress, password);

      if (!signedIn) setSigningIn(false);
    } catch (err) {
      console.log(err);
      showAlert({ message: err.message, type: AlertType.WARNING });
      setSigningIn(false);
    }
  };

  return (
    <StyledDismissKeyboard>
      <HeadingContainer>
        <HeadingText>Let&apos;s sign you in.</HeadingText>
        <SubHeadingText>Welcome back,</SubHeadingText>
        <SubHeadingText>You&apos;ve been missed!</SubHeadingText>
      </HeadingContainer>
      <InputContainer>
        <StandardTextInput
          value={emailAddress}
          label='Email address'
          onChangeText={value => setEmailAddress(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={15} />
        <StandardTextInput
          value={password}
          label='Password'
          onChangeText={value => setPassword(value)}
          secureTextEntry
          themeColourOverride='#fff'
        />
      </InputContainer>
      <StandardButton text='Sign In' raised onPress={attemptLogin} loading={signingIn} />
      <AppVersion />
    </StyledDismissKeyboard>
  );
};

const StyledDismissKeyboard = styled(DismissKeyboard)`
  flex: 1;
  align-items: center;
  padding-horizontal: 5%;
  padding-bottom: ${Platform.OS === 'ios' ? 15 : 0}px;
`;

const HeadingContainer = styled.View`
  justify-content: center;
  width: 100%;
`;

const HeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
`;

const SubHeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
  font-family: 'Muli_400Regular';
`;

const InputContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 100px;
`;

export default SignInScreen;
