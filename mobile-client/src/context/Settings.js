import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from 'library/enums';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Colours } from 'library/styles';
import { useMutation } from '@apollo/react-hooks';
import REGISTER_PUSH_TOKEN from 'library/graphql/mutations/registerPushToken.graphql';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const settings = useProviderSettings();
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

const useProviderSettings = () => {
  const [registerPushToken] = useMutation(REGISTER_PUSH_TOKEN);

  const settings = [
    {
      _id: 'theme',
      title: 'Theme',
      options: [
        { label: 'Dark', value: Theme.DARK },
        { label: 'Light', value: Theme.LIGHT },
        { label: 'System', value: Theme.AUTO },
      ],
      type: 'select',
      default: Theme.AUTO,
    },
    {
      _id: 'pushNotifications',
      title: 'Push Notifications',
      type: 'boolean',
      default: null,
      onChange: async value => {
        // TODO: unsubscribe user from notifications?
        if (!value) return true;

        const { status } = await Notifications.requestPermissionsAsync();

        console.log({ status });

        if (status !== 'granted') {
          console.error('User has denied permission for Push Notifications');
          return false;
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

        return success;
      },
    },
  ];

  const defaultSettings = settings.reduce((result, setting) => {
    const key = setting._id;
    const value = setting.default;

    return { ...result, [key]: value };
  }, {});

  const [userSettings, setUserSettings] = useState(defaultSettings);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);

  const updateSetting = async (settingId, value) => {
    const setting = settings.find(s => s._id === settingId);
    const shouldUpdate = await (setting?.onChange?.(value) || true);

    if (shouldUpdate) {
      const newSettings = { ...userSettings, [settingId]: value };
      setUserSettings(newSettings);
      AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
    }
  };

  useEffect(() => {
    const loadSavedSettings = async () => {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      setUserSettings(currSettings => {
        return { ...currSettings, ...JSON.parse(savedSettings) };
      });
      setBootstrapComplete(true);
    };

    loadSavedSettings();
  }, []);

  return {
    settings,
    userSettings,
    updateSetting,
    bootstrapComplete,
  };
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a SettingsProvider');
  }
  return context;
};

export { SettingsProvider, useSettings };
