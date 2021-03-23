import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import SubmitRSVPScreen from '../screens/SubmitRSVP';
import RSVPSuccessScreen from '../screens/RSVPSuccess';
import SettingsScreen from '../screens/Settings';
import NavigationPresets from '../library/helpers/NavigationPresets';
import WorkInProgressScreen from '../screens/WorkInProgress';

const Stack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const Tab = createBottomTabNavigator();

const GuestHomeNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={NavigationPresets.DefaultTabBar}>
      <Tab.Screen
        name='Home'
        component={WorkInProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='Memories'
        component={WorkInProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='image' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='Registry'
        component={WorkInProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='gift' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='settings' color={color} size={size} />,
          headerShown: true,
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='GuestHome' component={GuestHomeNavigator} />
      <Stack.Screen name='SubmitRSVP' component={SubmitRSVPScreen} />
      <Stack.Screen name='RSVPSuccess' component={RSVPSuccessScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
