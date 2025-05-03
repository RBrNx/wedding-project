import { Colours } from 'library/styles';
import { lighten } from 'library/utils/colours';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ImageLoader = () => (
  <ContentLoader
    speed={1}
    width='100%'
    height='100%'
    backgroundColor={lighten(Colours.primary, 0.2)}
    foregroundColor={lighten(Colours.primary, 0.3)}
    fillOpacity={1}
  >
    <Rect x='0' y='0' width='100%' height='100%' />
  </ContentLoader>
);

export default ImageLoader;
