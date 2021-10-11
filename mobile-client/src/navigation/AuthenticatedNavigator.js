import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAlert, useAuth, useSettings } from 'context';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import NavigationPresets from 'library/utils/NavigationPresets';
import AdminNavigator from 'navigation/admin/AdminNavigator';
import GuestNavigator from 'navigation/guest/GuestNavigator';
import { PortalProvider } from '@gorhom/portal';
import { useMutation } from '@apollo/react-hooks';
import REGISTER_PUSH_TOKEN from 'library/graphql/mutations/registerPushToken.graphql';
import NotificationPermissionCard from 'features/Dashboard/components/NotificationPermissionCard';
import { Platform } from 'react-native';
import { Colours } from 'library/styles';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';

const AuthenticatedStack = createStackNavigator();

const screenOptions = {
  ...NavigationPresets.NoHeader,
};

const AuthenticatedNavigator = () => {
  const [showPermissionCard, setShowPermissionCard] = useState(false);
  const [registerPushToken, { loading: registeringPushToken }] = useMutation(REGISTER_PUSH_TOKEN);
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { userSettings, updateSetting } = useSettings();
  const role = useMemo(() => user?.attributes?.['custom:role'], []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const dismissNotificationRequest = async () => {
    await updateSetting('pushNotifications', false);
    setShowPermissionCard(false);
  };

  const registerPushNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('User has denied permission for Push Notifications');
        setShowPermissionCard(false);
        return;
      }

      const { data: token } = await Notifications.getExpoPushTokenAsync();

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: Colours.secondary,
        });
      }

      const { data } = await registerPushToken({ variables: { token } });
      const { success } = data?.registerPushToken;

      updateSetting('pushNotifications', success);
      setShowPermissionCard(false);
    } catch (error) {
      const { message } = parseError(error);
      console.log(message);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const askForNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    console.log({ status, device: Constants.isDevice });

    if (status !== 'granted' && Constants.isDevice) setShowPermissionCard(true);
  };

  useEffect(() => {
    if (userSettings.pushNotifications === null) setTimeout(askForNotificationPermission, 3000);
  }, []);

  return (
    <PortalProvider>
      <AuthenticatedStack.Navigator screenOptions={screenOptions}>
        {role === 'ADMIN' && <AuthenticatedStack.Screen name='Admin' component={AdminNavigator} />}
        {role === 'GUEST' && <AuthenticatedStack.Screen name='Guest' component={GuestNavigator} />}
      </AuthenticatedStack.Navigator>
      {showPermissionCard && (
        <NotificationPermissionCard
          loading={registeringPushToken}
          onGrant={registerPushNotifications}
          onDismiss={dismissNotificationRequest}
        />
      )}
    </PortalProvider>
  );
};

export default AuthenticatedNavigator;
