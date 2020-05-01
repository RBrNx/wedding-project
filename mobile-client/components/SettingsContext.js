import React, { createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

const SettingsContext = createContext([{ theme: 'system' }, () => {}]);

const SettingsProvider = ({ children, value }) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const [userSettings, setUserSettings] = useContext(SettingsContext);

  const saveUserSetting = (setting, value) => {
    const newSettings = { ...userSettings, [setting]: value };
    setUserSettings(newSettings);
    AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  return { userSettings, saveUserSetting };
};

export { SettingsProvider, useSettings };
