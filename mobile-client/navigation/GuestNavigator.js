import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubmitRSVPScreen from '../screens/SubmitRSVP';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  // headerShown: false,
  // headerTitle: 'RSVP',
  headerTitleStyle: {
    color: '#fff',
  },
  headerStyle: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  // headerTransparent: true,
};

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='SubmitRSVP' component={SubmitRSVPScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
