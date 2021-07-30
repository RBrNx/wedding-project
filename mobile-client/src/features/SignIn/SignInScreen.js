import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import StandardButton from 'library/components/StandardButton';
import DismissKeyboard from 'library/components/DismissKeyboard';
import Spacer from 'library/components/Spacer';
import StandardTextInput from 'library/components/StandardTextInput';
import AppVersion from 'library/components/AppVersion';
import { Colours, Typography } from 'library/styles';
import { AlertType } from 'library/enums';
import { useAuth, useAlert } from 'context';

const SignInScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  const { signIn } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SignUpButton text='Sign Up' outline onPress={() => navigation.navigate('SignUp')} />,
    });
  }, [navigation]);

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

const SignUpButton = styled(StandardButton).attrs({
  textStyle: {
    paddingVertical: 0,
  },
})`
  width: 90px;
  height: 35px;
  margin-right: 15px;
`;

const HeadingContainer = styled.View`
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;

const HeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
`;

const SubHeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
  ${Typography.regularFont};
`;

const InputContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 100px;
`;

export default SignInScreen;
