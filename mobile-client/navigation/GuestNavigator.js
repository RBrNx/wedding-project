import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import SubmitRSVPScreen from 'screens/RSVP';
import RSVPSuccessScreen from 'screens/RSVP/RSVPSuccess';
import NavigationPresets from 'library/utils/NavigationPresets';
import SettingsScreen from '../screens/Settings';
import WorkInProgressScreen from '../screens/WorkInProgress';
import { useAuth } from '../context';

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
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={currentUser?.rsvpForm ? 'GuestHome' : 'SubmitRSVP'}
    >
      <Stack.Screen name='GuestHome' component={GuestHomeNavigator} />
      <Stack.Screen name='SubmitRSVP' component={SubmitRSVPScreen} />
      <Stack.Screen name='RSVPSuccess' component={RSVPSuccessScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
