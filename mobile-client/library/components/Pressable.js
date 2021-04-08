/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Pressable as RNPressable } from 'react-native';

const mergePressableStyles = style => {
  if (typeof style === 'function') return style;
  if (Array.isArray(style)) {
    return state => {
      return style.map(sty => {
        return typeof sty === 'function' ? sty(state) : sty;
      });
    };
  }
  return style;
};

const Pressable = ({ style, ...props }) => {
  const _style = useMemo(() => mergePressableStyles(style), [style]);
  return <RNPressable style={_style} {...props} />;
};

export default Pressable;
