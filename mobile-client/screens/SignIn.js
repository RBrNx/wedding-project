import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardButton from '../library/components/StandardButton';
import StandardTextInput from '../library/components/StandardTextInput';
import { useAuth } from '../context';
import DismissKeyboard from '../library/components/DismissKeyboard';
import { useAlert } from '../context/Alert';
import { AlertType } from '../library/enums';
import Spacer from '../library/components/Spacer';
import AppVersion from '../library/components/AppVersion';

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
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Let&apos;s sign you in.</Text>
          <Text style={styles.subHeading}>Welcome back,</Text>
          <Text style={styles.subHeading}>You&apos;ve been missed!</Text>
        </View>
        <View style={styles.inputContainer}>
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
        </View>
        <StandardButton text='Sign In' raised onPress={attemptLogin} loading={signingIn} />
        <AppVersion />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: 75,
  },
  headingContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Muli_700Bold',
  },
  subHeading: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Muli_400Regular',
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 100,
  },
});

export default SignInScreen;
