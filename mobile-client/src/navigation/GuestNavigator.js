import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import SubmitRSVPScreen from 'features/RSVP/SubmitRSVPScreen';
import RSVPSuccessScreen from 'features/RSVP/RSVPSuccessScreen';
import NavigationPresets from 'library/utils/NavigationPresets';
import SettingsScreen from 'features/Settings/SettingsScreen';
import WorkInProgressScreen from 'features/WorkInProgress/WorkInProgressScreen';
import DashboardScreen from 'features/Dashboard/DashboardScreen';

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
        name='Dashboard'
        component={DashboardScreen}
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
