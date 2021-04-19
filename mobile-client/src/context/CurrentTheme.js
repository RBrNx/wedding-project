import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Theme as ThemeEnum } from 'library/enums';
import { Colours, Theme } from 'library/styles';
import { useSettings } from './Settings';

const ThemeContext = createContext();

const CurrentThemeProvider = ({ children }) => {
  const { currentTheme, reactNavigationTheme } = useCurrentThemeProvider();

  return (
    <ThemeContext.Provider value={{ currentTheme, reactNavigationTheme }}>
      <StyledThemeProvider theme={{ theme: currentTheme }}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const useCurrentThemeProvider = () => {
  const systemLevelTheme = useColorScheme();
  const { userSettings } = useSettings();

  const currentTheme = useMemo(() => {
    if (userSettings.theme === ThemeEnum.AUTO) return systemLevelTheme;
    return userSettings.theme;
  }, [userSettings.theme, systemLevelTheme]);

  // Create the props structure expected by styled-components
  const styledProps = { theme: { theme: currentTheme } };
  const reactNavigationTheme = {
    colors: {
      background: Colours.primary,
      card: Theme.card(styledProps),
      text: Theme.bodyTextColour(styledProps),
    },
  };

  return {
    currentTheme,
    reactNavigationTheme,
  };
};

const useCurrentTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { CurrentThemeProvider, useCurrentTheme };
