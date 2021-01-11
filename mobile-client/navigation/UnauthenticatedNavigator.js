import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import ScannerScreen from '../screens/Scanner';

const UnauthenticatedStack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const UnauthenticatedNavigator = () => {
  return (
    <UnauthenticatedStack.Navigator screenOptions={screenOptions}>
      <UnauthenticatedStack.Screen name='SignIn' component={SignInScreen} />
      <UnauthenticatedStack.Screen name='Scanner' component={ScannerScreen} />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
