import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignInScreen from 'screens/SignIn';
import ScannerScreen from 'screens/Scanner';
import LandingScreen from 'screens/Landing';
import NavigationPresets from 'library/utils/NavigationPresets';

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
      <UnauthenticatedStack.Screen
        name='Scanner'
        component={ScannerScreen}
        options={{ ...NavigationPresets.OnlyBackButton, ...NavigationPresets.TransparentHeader }}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
