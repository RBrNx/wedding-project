import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CachedImage = ({ source: { uri }, cacheKey, ...otherProps }) => {
  const filesystemURI = `${FileSystem.cacheDirectory}images/${cacheKey}`;
  const [imgURI, setImgURI] = useState(filesystemURI);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI);
        if (!metadata.exists) {
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
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      source={{
        uri: imgURI,
      }}
    />
  );
};

export default CachedImage;
