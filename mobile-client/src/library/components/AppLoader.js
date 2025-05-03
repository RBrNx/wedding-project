/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { useFonts, Muli_400Regular, Muli_700Bold } from '@expo-google-fonts/muli';
import { useAuth, useDatastore, useSettings } from 'context';
import cleanImageCache from 'library/utils/cleanImageCache';
import AnimatedSplashScreen from './AnimatedSplashScreen';

const getLoadingMessage = ({ authBootstrapped, dataBootstrapped }) => {
  if (!authBootstrapped) return 'Authenticating';
  if (!dataBootstrapped) return 'Retrieving event';

  return '';
};

const AppLoader = ({ children }) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [splashImage, setSplashImage] = useState(null);
  const [fontsLoaded] = useFonts({ Muli_400Regular, Muli_700Bold });
  const { bootstrapComplete: authBootstrapped } = useAuth();
  const { bootstrapComplete: settingsBootstrapped } = useSettings();
  const { bootstrapComplete: dataBootstrapped } = useDatastore();
  const isAppReady = fontsLoaded && authBootstrapped && settingsBootstrapped && dataBootstrapped;
  const loadingMessage = getLoadingMessage({ authBootstrapped, dataBootstrapped });

  const downloadSplash = async () => {
    // eslint-disable-next-line global-require
    const asset = await Asset.fromModule(require('assets/splash.png')).downloadAsync();
    setSplashImage(asset);
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        console.log('Preparing splash screen');
        await SplashScreen.preventAutoHideAsync();
        cleanImageCache();
        await downloadSplash();
        console.log('Splash screen prepared');
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsSplashReady(true);
        console.log('Splash screen ready', { fontsLoaded, authBootstrapped, settingsBootstrapped, dataBootstrapped });
      }
    }

    prepare();
  }, []);

  if (!isSplashReady) {
    // return (
    //   <AppLoading
    //     autoHideSplash
    //     startAsync={downloadSplash}
    //     onFinish={() => setIsSplashReady(true)}
    //     onError={err => console.error(err)}
    //   />
    // );
    return null;
  }

  return (
    <AnimatedSplashScreen splashImage={splashImage} isAppReady={isAppReady} loadingMessage={loadingMessage}>
      {children}
    </AnimatedSplashScreen>
  );
};

export default AppLoader;
