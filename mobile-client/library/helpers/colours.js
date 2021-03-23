import Color from 'color';

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

export { darken, lighten };
