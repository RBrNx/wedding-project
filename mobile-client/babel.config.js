module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['macros', 'react-native-reanimated/plugin'],
  };
};
