import { Platform } from 'react-native';
import { Colours } from '../../styles';

const NavigationPresets = {
  NoHeader: {
    headerShown: false,
  },
  OnlyBackButton: {
    headerShown: true,
    headerTransparent: false,
    headerTintColor: Colours.neutral.white,
    headerTitle: '',
    headerBackTitleVisible: false,
    headerLeftContainerStyle: { marginLeft: Platform.select({ ios: 15, android: 0 }) },
    headerStyle: { backgroundColor: Colours.primary, elevation: 0, shadowOpacity: 0 },
  },
  TransparentHeader: {
    headerTransparent: true,
  },
  DefaultTabBar: {
    activeTintColor: Colours.secondary,
    showLabel: false,
    style: {
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 65 : 80,
      paddingBottom: Platform.OS === 'android' ? 10 : 30,
      paddingTop: 10,
    },
  },
};

export default NavigationPresets;
