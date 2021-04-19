import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useAuth, useCurrentTheme } from 'context';
import NavigationPresets from 'library/utils/NavigationPresets';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';

const Stack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
  ...TransitionPresets.SlideFromRightIOS,
};

const AppNavigator = () => {
  const { isAuthenticated, isSigningOut } = useAuth();
  const { reactNavigationTheme } = useCurrentTheme();

  return (
    <NavigationContainer theme={reactNavigationTheme}>
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
  );
};

export default AppNavigator;
