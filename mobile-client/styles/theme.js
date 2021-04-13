import theme from 'styled-theming';
import { darken, lighten } from '../library/helpers/colours';
import { neutral } from './colours';

const card = theme('theme', {
  light: neutral.white,
  dark: neutral.darkerGrey,
});

const cardPressed = theme('theme', {
  light: darken(neutral.white, 0.2),
  dark: lighten(neutral.offBlack, 0.2),
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

export { card, cardPressed, background, headerTextColour, bodyTextColour };
