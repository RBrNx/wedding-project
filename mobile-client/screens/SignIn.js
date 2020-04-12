import React from 'react';
import { Text, View, Button } from 'react-native';

const SignInScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>SignIn</Text>
      <Button title='Navigate to Home' onPress={() => route.params?.setIsAuthenticated(true)} />
    </View>
  );
};

export default SignInScreen;
