import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components';
import { Layout } from 'library/styles';
import { hash } from 'features/Memories/helpers';

const CachedImage = ({ source: { uri }, loadingComponent, style, ...otherProps }) => {
  const cacheKey = uri ? hash(uri) : null;
  const filesystemURI = `${FileSystem.cacheDirectory}images/${cacheKey}`;
  const [loading, setLoading] = useState(true);
  const [imgURI, setImgURI] = useState(filesystemURI);
  const componentIsMounted = useRef(true);
  const loaderVisibility = useSharedValue(1);

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loaderVisibility.value,
  }));

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI);
        if (!metadata.exists && uri) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null);
            await FileSystem.downloadAsync(uri, fileURI);
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI);
          }
        }
      } catch (err) {
        console.log(err); // eslint-disable-line no-console
        setImgURI(uri);
      }
    };

    loadImage({ fileURI: filesystemURI });

    return () => {
      componentIsMounted.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading && <LoaderContainer style={loaderAnimatedStyle}>{loadingComponent}</LoaderContainer>}
      <Animated.Image
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        source={uri ? { uri: imgURI } : null}
        style={style}
        onLoad={() => {
          if (uri) {
            loaderVisibility.value = withTiming(0, { duration: 200 }, isFinished => {
              if (isFinished) runOnJS(setLoading)(false);
            });
          }
        }}
      />
    </>
  );
};

const LoaderContainer = styled(Animated.View)`
  ${Layout.absoluteFill};
  z-index: 99;
`;

export default CachedImage;
