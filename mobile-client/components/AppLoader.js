import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import AnimatedSplashScreen from './AnimatedSplashScreen';

const AppLoader = ({ children }) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [splashImage, setSplashImage] = useState(null);

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

  return <AnimatedSplashScreen splashImage={splashImage}>{children}</AnimatedSplashScreen>;
};

export default AppLoader;
