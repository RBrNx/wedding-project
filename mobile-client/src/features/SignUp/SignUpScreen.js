import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import StandardButton from 'library/components/StandardButton';
import Spacer from 'library/components/Spacer';
import StandardTextInput from 'library/components/StandardTextInput';
import { Colours, Typography } from 'library/styles';
import { AlertType } from 'library/enums';
import { useAlert } from 'context';
import StandardDatePicker from 'library/components/StandardDatePicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CREATE_EVENT from 'library/graphql/mutations/createEvent.graphql';
import { useMutation } from '@apollo/react-hooks';
import parseError from 'library/utils/parseError';
import dayjs from 'dayjs';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [familySurname, setFamilySurname] = useState(null);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEvent] = useMutation(CREATE_EVENT);
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();

  const createNewEvent = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await createEvent({
        variables: {
          input: {
            name: `The ${familySurname} Wedding`,
            date: dayjs(date).format('YYYY-MM-DD'),
            admin: { firstName, lastName, email, password },
          },
        },
      });
      const { success, payload } = data.createEvent;

      if (success) {
        // _id is the username until Email has been confirmed
        navigation.navigate('ConfirmSignUp', { username: payload.admin._id, email, password });
      } else setIsSubmitting(false);
    } catch (err) {
      const { message } = parseError(err);
      console.log(message);
      showAlert({ message, type: AlertType.WARNING });
      setIsSubmitting(false);
    }
  };

  return (
    <StyledScrollView insets={insets}>
      <HeadingContainer>
        <HeadingText>Let&apos;s create your wedding event.</HeadingText>
        <SubHeadingText>We just need a few details!</SubHeadingText>
      </HeadingContainer>
      <InputContainer>
        <QuestionText>What is your first name?</QuestionText>
        <StandardTextInput
          value={firstName}
          label='First name'
          onChangeText={value => setFirstName(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is your last name?</QuestionText>
        <StandardTextInput
          value={lastName}
          label='Last name'
          onChangeText={value => setLastName(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is your future family surname?</QuestionText>
        <StandardTextInput
          value={familySurname}
          label='Family surname'
          onChangeText={value => setFamilySurname(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is the date of your wedding?</QuestionText>
        <StandardDatePicker
          value={date}
          label='Wedding date'
          onChange={value => setDate(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is your email address?</QuestionText>
        <StandardTextInput
          value={email}
          label='Email address'
          onChangeText={value => setEmail(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <QuestionText>What is your password?</QuestionText>
        <StandardTextInput
          value={password}
          label='Password'
          onChangeText={value => setPassword(value)}
          themeColourOverride='#fff'
        />
        <Spacer size={30} />
        <StandardButton text='Create my wedding event' raised onPress={createNewEvent} loading={isSubmitting} />
      </InputContainer>
    </StyledScrollView>
  );
};

const StyledScrollView = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingBottom: Platform.OS === 'ios' ? props.insets.bottom : 15,
  },
}))``;

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
  padding-top: 50px;
`;

const QuestionText = styled.Text`
  ${Typography.h4};
  color: ${Colours.neutral.white};
  ${Typography.regularFont}
  margin-left: 5px;
  margin-bottom: 5px;
`;

export default SignUpScreen;
