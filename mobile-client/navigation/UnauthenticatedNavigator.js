import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import ScannerScreen from '../screens/Scanner';
import LandingScreen from '../screens/LandingScreen';

const UnauthenticatedStack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const UnauthenticatedNavigator = () => {
  return (
    <UnauthenticatedStack.Navigator screenOptions={screenOptions}>
      <UnauthenticatedStack.Screen name='Landing' component={LandingScreen} />
      <UnauthenticatedStack.Screen name='SignIn' component={SignInScreen} />
      <UnauthenticatedStack.Screen name='Scanner' component={ScannerScreen} />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
