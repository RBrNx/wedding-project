import { Platform } from 'react-native';

const NavigationPresets = {
  NoHeader: {
    headerShown: false,
  },
  OnlyBackButton: {
    headerShown: true,
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitle: '',
  },
  DefaultTabBar: {
    activeTintColor: '#2991cc',
    style: {
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 65 : 80,
      paddingBottom: Platform.OS === 'android' ? 10 : 30,
      paddingTop: 10,
    },
  },
};

export default NavigationPresets;
