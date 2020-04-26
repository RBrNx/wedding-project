import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const white = '#fff';
const lightGrey = '#f5f5f5';
const darkBlue = '#14233c';
const lightBlue = '#2991cc';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkBlue,
    secondary: lightBlue,
    background: darkBlue,
    card: white,
    componentBackground: lightGrey,
    bodyText: '#444',
  },
};

const darkTheme = { ...DarkTheme };

const constantStyles = {
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1.25,
  },
};

export { lightTheme, darkTheme, constantStyles };
