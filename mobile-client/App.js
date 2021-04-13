import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import 'react-native-url-polyfill/auto';
import { AppearanceProvider } from 'react-native-appearance';
import * as SplashScreen from 'expo-splash-screen';
import Amplify from 'aws-amplify';
import { setStatusBarStyle } from 'expo-status-bar';
import client from './utils/apiClient';
import { SettingsProvider, AuthProvider, CurrentThemeProvider, AlertProvider } from './context';
import awsConfig from './awsExports';
import AppNavigator from './navigation/AppNavigator';
import AppLoader from './components/AppLoader';

Amplify.configure({
  Auth: {
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
  },
});

const App = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setStatusBarStyle('light');
  }, []);

  return (
    <AppearanceProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <SettingsProvider>
            <CurrentThemeProvider>
              <AlertProvider>
                <AppLoader>
                  <AppNavigator />
                </AppLoader>
              </AlertProvider>
            </CurrentThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </ApolloProvider>
    </AppearanceProvider>
  );
};

export default App;
