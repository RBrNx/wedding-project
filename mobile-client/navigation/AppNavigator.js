import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import { useAuth, useSettings } from '../context';
import { Theme as ThemeEnum } from '../library/enums';
import NavigationPresets from '../library/helpers/NavigationPresets';
import { Colours, Theme } from '../styles';

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
    if (userSettings.theme === ThemeEnum.AUTO) return systemLevelTheme;
    return userSettings.theme;
  }, [userSettings.theme, systemLevelTheme]);

  // Create the props structure expect by styled-components
  const styledProps = { theme: { theme } };

  return (
    <ThemeProvider theme={{ theme }}>
      <NavigationContainer
        theme={{
          colors: {
            background: Colours.primary,
            card: Theme.card(styledProps),
            text: Theme.bodyTextColour(styledProps),
          },
        }}
      >
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
