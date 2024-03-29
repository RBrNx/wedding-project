import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignInScreen from 'features/SignIn/SignInScreen';
import ScannerScreen from 'features/Scanner/ScannerScreen';
import LandingScreen from 'features/Landing/LandingScreen';
import NavigationPresets from 'library/utils/NavigationPresets';
import SignUpScreen from 'features/SignUp/SignUpScreen';
import ConfirmSignUpScreen from 'features/SignUp/ConfirmSignUpScreen';

const UnauthenticatedStack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const UnauthenticatedNavigator = () => {
  return (
    <UnauthenticatedStack.Navigator screenOptions={screenOptions}>
      <UnauthenticatedStack.Screen name='Landing' component={LandingScreen} />
      <UnauthenticatedStack.Screen name='SignIn' component={SignInScreen} options={NavigationPresets.OnlyBackButton} />
      <UnauthenticatedStack.Screen name='SignUp' component={SignUpScreen} options={NavigationPresets.OnlyBackButton} />
      <UnauthenticatedStack.Screen
        name='ConfirmSignUp'
        component={ConfirmSignUpScreen}
        options={NavigationPresets.EmptyHeader}
      />
      <UnauthenticatedStack.Screen
        name='Scanner'
        component={ScannerScreen}
        options={{ ...NavigationPresets.OnlyBackButton, ...NavigationPresets.TransparentHeader }}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
