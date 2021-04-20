module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      'macros',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            library: './src/library',
            context: './src/context',
            features: './src/features',
            navigation: './src/navigation',
            assets: './assets',
          },
        },
      ],
    ],
  };
};
