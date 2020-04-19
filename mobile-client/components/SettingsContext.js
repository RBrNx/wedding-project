import React, { createContext, useContext } from 'react';

const SettingsContext = createContext([{ theme: 'system' }, () => {}]);

const SettingsProvider = ({ children, value }) => {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const context = useContext(SettingsContext);

  return context;
};

export { SettingsProvider, useSettings };
