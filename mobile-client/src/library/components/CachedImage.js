import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { hash } from 'features/Memories/helpers';
import styled from 'styled-components';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Layout } from 'library/styles';

const CachedImage = ({ source: { uri }, loadingComponent, ...otherProps }) => {
  const [imgURI, setImgURI] = useState(null);
  const [loading, setLoading] = useState(true);
  const componentIsMounted = useRef(true);
  const loaderVisibility = useSharedValue(1);

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loaderVisibility.value,
  }));

  const getFilePath = inputUri => {
    const cacheKey = hash(inputUri);
    const filesystemURI = `${FileSystem.cacheDirectory}images/${cacheKey}`;

    return filesystemURI;
  };

  useEffect(() => {
    const loadImage = async () => {
      if (uri) {
        try {
          if (uri.startsWith('file://')) {
            setImgURI(uri);
            return;
          }

          const filePath = getFilePath(uri);
          const metadata = await FileSystem.getInfoAsync(filePath);
          if (metadata.exists) setImgURI(filePath);
          else {
            // download to cache
            if (componentIsMounted.current) {
              await FileSystem.downloadAsync(uri, filePath);
            }
            if (componentIsMounted.current) {
              setImgURI(filePath);
            }
          }
        } catch (err) {
          console.error('Error with paths, falling back to uri', uri, err);
          setImgURI(uri);
        }
      }
    };

    loadImage();
  }, [uri]);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return (
    <>
      {loading && <LoaderContainer style={loaderAnimatedStyle}>{loadingComponent}</LoaderContainer>}
      <Image
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        source={{ uri: imgURI }}
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
