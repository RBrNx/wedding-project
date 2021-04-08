import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import { useAuth, useSettings } from '../context';
import { Theme } from '../library/enums';
import NavigationPresets from '../library/helpers/NavigationPresets';
import { Colours } from '../styles';

const Stack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const AppNavigator = () => {
  const systemLevelTheme = useColorScheme();
  const { isAuthenticated, isSigningOut } = useAuth();
  const { userSettings } = useSettings();

  const theme = useMemo(() => {
    if (userSettings.theme === Theme.AUTO) return systemLevelTheme;
    return userSettings.theme;
  }, [userSettings.theme, systemLevelTheme]);

  return (
    <ThemeProvider theme={{ theme }}>
      <NavigationContainer theme={{ colors: { background: Colours.primary } }}>
        <Stack.Navigator screenOptions={screenOptions}>
          {!isAuthenticated ? (
            <Stack.Screen
              name='Unauthenticated'
              component={UnauthenticatedNavigator}
              options={{ animationTypeForReplace: isSigningOut ? 'pop' : 'push' }}
            />
          ) : (
            <Stack.Screen name='Authenticated' component={AuthenticatedNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
