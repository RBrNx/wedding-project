import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify';
import StandardButton from '../components/StandardButton';
import StandardInput from '../components/StandardInput';
import LandingScreenBackground from '../components/LandingScreenBackground';

const SignInScreen = ({ route }) => {
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);

  const attemptLogin = async () => {
    try {
      const lowercaseEmail = emailAddress.toLowerCase();
      await Auth.signIn(lowercaseEmail, password);

      // eslint-disable-next-line no-unused-expressions
      route.params?.setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LandingScreenBackground />
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Hello</Text>
          <Text style={styles.subHeading}>Sign in to your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <StandardInput value={emailAddress} label='Email Address' onChangeText={value => setEmailAddress(value)} />
          <StandardInput value={password} label='Password' onChangeText={value => setPassword(value)} />
        </View>
        <View style={styles.buttonContainer}>
          <StandardButton text='Sign In' raised onPress={attemptLogin} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 96,
    color: '#fff',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
  },
});

export default SignInScreen;
