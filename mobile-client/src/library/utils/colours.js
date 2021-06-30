/* eslint-disable no-bitwise */
import Color from 'color';
import { neutral } from 'library/styles/colours';

const darken = (color, percentage) => {
  return Color(color)
    .darken(percentage)
    .toString();
};

const lighten = (color, percentage) => {
  return Color(color)
    .lighten(percentage)
    .toString();
};

const fade = (color, percentage) => {
  return Color(color)
    .fade(percentage)
    .toString();
};

const opaque = (color, percentage) => {
  return Color(color)
    .opaquer(percentage)
    .toString();
};

const getComplementaryColor = (color = '') => {
  const colorPart = color.slice(1);
  const ind = parseInt(colorPart, 16);
  let iter = ((1 << (4 * colorPart.length)) - 1 - ind).toString(16);
  while (iter.length < colorPart.length) {
    iter = `0${iter}`;
  }
  return `#${iter}`;
};

const getContrastingTextColor = color => {
  return Color(color).isLight() ? neutral.offBlack : neutral.offWhite;
};

export { darken, lighten, fade, opaque, getComplementaryColor, getContrastingTextColor };
