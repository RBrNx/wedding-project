import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { darkTheme, lightTheme } from '../styles/theming';
import SignInScreen from '../screens/SignIn';
import HomeNavigator from './HomeNavigator';
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
  const { isAuthenticated, bootstrapComplete: authBootstrapped } = useAuth();
  const { userSettings, bootstrapComplete: settingsBootstrapped } = useSettings();

  useEffect(() => {
    if (settingsBootstrapped && authBootstrapped) {
      SplashScreen.hideAsync();
    }
  }, [settingsBootstrapped, authBootstrapped]);

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
          <Stack.Screen name='SignIn' component={SignInScreen} />
        ) : (
          <Stack.Screen name='Home' component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
