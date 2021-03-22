import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SubmitRSVPScreen from '../screens/SubmitRSVP';
import NavigationPresets from '../library/helpers/NavigationPresets';

const Stack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='SubmitRSVP' component={SubmitRSVPScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
