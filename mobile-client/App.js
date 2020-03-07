import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/SignIn';
import GuestsScreen from './screens/Guests';
import InvitationsScreen from './screens/Invitations';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Guests' component={GuestsScreen} />
      <Tab.Screen name='Invitations' component={InvitationsScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='Home' component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
