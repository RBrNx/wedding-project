import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import Color from 'color';

const black = '#000';
const white = '#fff';
const lightGrey = '#f5f5f5';
const darkGrey = '#1d1d1d';
const darkBlue = '#14233c';
const lightBlue = '#2991cc';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBlue,
    secondary: lightBlue,
    background: darkBlue,
    button: lightBlue,
    buttonPressed: Color(lightBlue)
      .darken(0.2)
      .hex(),
    card: white,
    cardHover: Color(white)
      .darken(0.12)
    cardBackround: '#fbfbfb',
    componentBackground: '#e0e0e0',
    bodyText: '#444',
    focusedText: '#000',
    headerText: '#000',
    border: '#000',
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
    buttonPressed: Color(lightBlue)
      .darken(0.2)
    card: '#2b2b2b',
    cardHover: Color('#2b2b2b')
      .darken(0.12)
    cardBackround: darkGrey,
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
};

export { lightTheme, darkTheme, constantStyles };
