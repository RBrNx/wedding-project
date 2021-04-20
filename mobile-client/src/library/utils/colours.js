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

export { darken, lighten, fade, opaque };
