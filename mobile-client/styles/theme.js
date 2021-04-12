import theme from 'styled-theming';
import { neutral } from './colours';

const card = theme('theme', {
  light: neutral.white,
  dark: neutral.black,
});

const background = theme('theme', {
  light: neutral.offWhite,
  dark: neutral.offBlack,
});

const headerTextColour = theme('theme', {
  light: neutral.white,
  dark: neutral.black,
});

const bodyTextColour = theme('theme', {
  light: neutral.darkGrey,
  dark: neutral.cream,
});

export { card, background, headerTextColour, bodyTextColour };
