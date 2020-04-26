import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from '@apollo/react-hooks';
import { Feather } from '@expo/vector-icons';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import SignInScreen from './screens/SignIn';
import GuestsScreen from './screens/Guests';
import InvitationsScreen from './screens/Invitations';
import SettingsScreen from './screens/Settings';
import client from './utils/apiClient';
import { SettingsProvider } from './components/SettingsContext';
import { darkTheme, lightTheme } from './styles/theming';

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
        style: { borderTopWidth: 0 },
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
    SplashScreen.preventAutoHide();

    const getSavedSettings = async () => {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      setUserSettings(currSettings => {
        return { ...currSettings, ...JSON.parse(savedSettings) };
      });
      SplashScreen.hide();
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
          <NavigationContainer theme={getTheme(userSettings.theme) === 'dark' ? darkTheme : lightTheme}>
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
