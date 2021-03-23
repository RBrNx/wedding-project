/* eslint-disable camelcase */
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { useFonts, Muli_400Regular, Muli_700Bold } from '@expo-google-fonts/muli';
import AnimatedSplashScreen from './AnimatedSplashScreen';
import { useAuth, useSettings } from '../context';

const AppLoader = ({ children }) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [splashImage, setSplashImage] = useState(null);
  const [fontsLoaded] = useFonts({ Muli_400Regular, Muli_700Bold });
  const { bootstrapComplete: authBootstrapped } = useAuth();
  const { bootstrapComplete: settingsBootstrapped } = useSettings();
  const isAppReady = fontsLoaded && authBootstrapped && settingsBootstrapped;

  const downloadSplash = async () => {
    // eslint-disable-next-line global-require
    const asset = await Asset.fromModule(require('../assets/splash.png')).downloadAsync();
    setSplashImage(asset);
  };

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={downloadSplash}
        onFinish={() => setIsSplashReady(true)}
        onError={err => console.error(err)}
      />
    );
  }

  return (
    <AnimatedSplashScreen splashImage={splashImage} isAppReady={isAppReady}>
      {children}
    </AnimatedSplashScreen>
  );
};

export default AppLoader;
