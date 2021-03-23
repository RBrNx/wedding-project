import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import GuestsScreen from '../screens/Guests';
import InvitationsScreen from '../screens/Invitations';
import SettingsScreen from '../screens/Settings';
import NavigationPresets from '../library/helpers/NavigationPresets';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
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

export default AdminNavigator;
