import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubmitRSVPScreen from '../screens/SubmitRSVP';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='SubmitRSVP' component={SubmitRSVPScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
