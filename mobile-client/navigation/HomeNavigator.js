import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GuestsScreen from '../screens/Guests';
import InvitationsScreen from '../screens/Invitations';
import SettingsScreen from '../screens/Settings';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2991cc',
        style: {
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 65 : 80,
          paddingBottom: Platform.OS === 'android' ? 10 : 30,
          paddingTop: 10,
        },
      }}
    >
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

export default HomeNavigator;
