import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../styles/theming';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import { useAuth, useSettings } from '../context';
import { Theme } from '../library/enums';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const AppNavigator = () => {
  const systemLevelTheme = useColorScheme();
  const { isAuthenticated } = useAuth();
  const { userSettings } = useSettings();

  const getTheme = () => {
    switch (userSettings.theme) {
      case Theme.DARK:
        return darkTheme;
      case Theme.LIGHT:
        return lightTheme;
      case Theme.AUTO:
      default:
        return systemLevelTheme === 'dark' ? darkTheme : lightTheme;
    }
  };

  return (
    <NavigationContainer theme={getTheme()}>
      <Stack.Navigator screenOptions={screenOptions}>
        {!isAuthenticated ? (
          <Stack.Screen name='Unauthenticated' component={UnauthenticatedNavigator} />
        ) : (
          <Stack.Screen name='Authenticated' component={AuthenticatedNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
