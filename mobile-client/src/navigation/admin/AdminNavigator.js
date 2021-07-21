import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import GuestsScreen from 'features/Guests/GuestsScreen';
import InvitationsScreen from 'features/Invitations/InvitationsScreen';
import SettingsScreen from 'features/Settings/SettingsScreen';
import NavigationPresets from 'library/utils/NavigationPresets';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ViewGuestScreen from 'features/Guests/ViewGuestScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const AdminHomeNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={NavigationPresets.DefaultTabBar}>
      <Tab.Screen
        name='Guests'
        component={GuestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='users' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='Invitations'
        component={InvitationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='mail' color={color} size={size} />,
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

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='AdminHome' component={AdminHomeNavigator} />
      <Stack.Screen name='ViewGuest' component={ViewGuestScreen} options={NavigationPresets.OnlyBackButton} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
