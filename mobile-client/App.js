import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from '@apollo/react-hooks';
import { Feather } from '@expo/vector-icons';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { AsyncStorage } from 'react-native';
import SignInScreen from './screens/SignIn';
import GuestsScreen from './screens/Guests';
import InvitationsScreen from './screens/Invitations';
import SettingsScreen from './screens/Settings';
import client from './utils/apiClient';
import { SettingsProvider } from './components/SettingsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerShown: false,
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2991cc',
      }}
    >
      <Tab.Screen
        name='Guests'
        component={GuestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='users' color={color} size={size} />,
        }}
      />
      <Tab.Screen name='Invitations' component={InvitationsScreen} />
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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSettings, setUserSettings] = useState({ theme: 'system' });
  const systemLevelTheme = useColorScheme();

  useEffect(() => {
    const getSavedSettings = async () => {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      setUserSettings(currSettings => {
        return { ...currSettings, ...JSON.parse(savedSettings) };
      });
    };

    getSavedSettings();
  }, []);

  const getTheme = themeSetting => {
    if (themeSetting === 'system') return systemLevelTheme;
    return themeSetting;
  };

  return (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <SettingsProvider value={[userSettings, setUserSettings]}>
          <NavigationContainer theme={getTheme(userSettings.theme) === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={screenOptions}>
              {!isAuthenticated ? (
                <Stack.Screen name='SignIn' component={SignInScreen} initialParams={{ setIsAuthenticated }} />
              ) : (
                <Stack.Screen name='Home' component={HomeNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SettingsProvider>
      </ApolloProvider>
    </AppearanceProvider>
  );
};

export default App;
