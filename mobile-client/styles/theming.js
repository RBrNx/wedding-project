import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import { darken } from '../library/helpers/colours';

const black = '#000';
const white = '#fff';
const lightGrey = '#f5f5f5';
const darkGrey = '#1d1d1d';
const darkBlue = '#14233c';
const lightBlue = '#2991cc';
const coral = '#ff4d56';

const colours = {
  lightBlue,
  coral,
};

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBlue,
    secondary: lightBlue,
    background: darkBlue,
    button: lightBlue,
    buttonPressed: darken(lightBlue, 0.2),
    card: white,
    cardHover: darken(white, 0.12),
    cardBackground: '#f5f5f5',
    componentBackground: '#e0e0e0',
    bodyText: '#444',
    focusedText: '#000',
    headerText: '#000',
    border: '#ccc',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkBlue,
    secondary: lightBlue,
    background: darkBlue,
    button: lightBlue,
    buttonPressed: darken(lightBlue, 0.2),
    card: '#2b2b2b',
    cardHover: darken('#2b2b2b', 0.12),
    cardBackground: darkGrey,
    componentBackground: '#e0e0e0',
    bodyText: '#eee',
    focusedText: '#fff',
    headerText: '#fff',
    border: '#fff',
  },
};

const constantStyles = {
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.19,
        shadowRadius: 1,
      },
      android: {
        elevation: 1.25,
      },
    }),
  },
  inputShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  inputBorder: {
    borderRadius: 5,
    borderWidth: 1.5,
  },
};

export { lightTheme, darkTheme, constantStyles, colours };
