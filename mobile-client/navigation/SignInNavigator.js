import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import ScannerScreen from '../screens/Scanner';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const SignInNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='Scanner' component={ScannerScreen} />
    </Stack.Navigator>
  );
};

export default SignInNavigator;
