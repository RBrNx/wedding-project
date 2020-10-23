const { version } = require('./package.json');

export default {
  name: 'The Watson Wedding',
  slug: 'watson-wedding-dev',
  privacy: 'unlisted',
  platforms: ['ios', 'android'],
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#14233c',
  },
  android: {
    package: 'com.rbrnx.watsonwedding',
    versionCode: 2,
    permissions: [],
    softwareKeyboardLayoutMode: 'pan',
  },
  androidStatusBar: {
    barStyle: 'light-content',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  extra: {
    BASE_API_URL: 'https://xiey9y60ej.execute-api.eu-west-2.amazonaws.com/dev/',
    AUTH_ENDPOINT: 'admin',
    UNAUTH_ENDPOINT: 'api',
  },
};
