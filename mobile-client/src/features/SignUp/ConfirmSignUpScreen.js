import React, { useState } from 'react';
import styled from 'styled-components/native';
import StandardButton from 'library/components/StandardButton';
import { Colours, Layout, Typography } from 'library/styles';
import StandardCodeInput from 'library/components/StandardCodeInput';
import { useAuth } from 'context';
import parseError from 'library/utils/parseError';

const ConfirmSignUpScreen = ({ route }) => {
  const { username, email, password } = route.params;
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { confirmSignUp, signIn } = useAuth();

  const attemptConfirmation = async () => {
    try {
      setIsSubmitting(true);
      const success = await confirmSignUp(username, code);

      if (success) {
        const signedIn = await signIn(email, password);

        if (!signedIn) setIsSubmitting(false);
      } else setIsSubmitting(false);
    } catch (err) {
      const { message } = parseError(err);
      console.log(message);
    }
  };

  return (
    <Container>
      <HeadingContainer>
        <HeadingText>Let&apos;s verify your email address.</HeadingText>
        <SubHeadingText>Enter the 6 digit code you should have recieved.</SubHeadingText>
      </HeadingContainer>
      <InputContainer>
        <StandardCodeInput value={code} setValue={setCode} />
      </InputContainer>
      <StandardButton text='Confirm' raised onPress={attemptConfirmation} loading={isSubmitting} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-horizontal: 5%;
  ${Layout.safeArea};
`;

const HeadingContainer = styled.View`
  margin-top: 15px;
`;

const HeadingText = styled.Text`
  ${Typography.h1};
  color: ${Colours.neutral.white};
`;

const SubHeadingText = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.grey2};
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export default ConfirmSignUpScreen;
