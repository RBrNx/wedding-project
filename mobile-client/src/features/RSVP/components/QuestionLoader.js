import { Colours } from 'library/styles';
import { darken, lighten } from 'library/utils/colours';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const QuestionLoader = () => (
  <ContentLoader
    speed={2}
    width='100%'
    height='100%'
    viewBox='0 0 300 90'
    backgroundColor={darken(Colours.primary, 0.2)}
    foregroundColor={lighten(Colours.primary, 0.1)}
  >
    <Rect x='0' y='0' rx='10' ry='10' width='50' height='40' />
    <Rect x='0' y='45' rx='10' ry='10' width='300' height='40' />
    <Rect x='0' y='90' rx='10' ry='10' width='300' height='40' />
    <Rect x='0' y='135' rx='10' ry='10' width='200' height='40' />
  </ContentLoader>
);

export default QuestionLoader;
