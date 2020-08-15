import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Auth } from 'aws-amplify';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' }}>
      <Text style={{ fontSize: 18, marginBottom: 10, color: '#fff' }}>SignIn</Text>
      <TextInput value={emailAddress} placeholder='Email Address' onChangeText={value => setEmailAddress(value)} style={styles.textInput} />
      <TextInput value={password} placeholder='Password' onChangeText={value => setPassword(value)} style={styles.textInput} />
      <Button title='Sign In' onPress={attemptLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    marginBottom: 15,
  },
});

export default SignInScreen;
