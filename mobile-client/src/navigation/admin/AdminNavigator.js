import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import GuestsScreen from 'features/Guests/GuestsScreen';
import SettingsScreen from 'features/Settings/SettingsScreen';
import NavigationPresets from 'library/utils/NavigationPresets';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ViewGuestScreen from 'features/Guests/ViewGuestScreen';
import RSVPQuestionsScreen from 'features/RSVP/RSVPQuestionsScreen';

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
        name='Questions'
        component={RSVPQuestionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='form-select' color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='settings' color={color} size={size} />,
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
