import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Theme } from '../library/enums';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const settings = useProviderSettings();
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

const useProviderSettings = () => {
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
  ];

  const defaultSettings = settings.reduce((result, setting) => {
    const key = setting._id;
    const value = setting.default;

    return { ...result, [key]: value };
  }, {});

  const [userSettings, setUserSettings] = useState(defaultSettings);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);

  const updateSetting = (setting, value) => {
    const newSettings = { ...userSettings, [setting]: value };
    setUserSettings(newSettings);
    AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
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
