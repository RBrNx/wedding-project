import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Blob1 from '../assets/animations/blob.json';
import Blob2 from '../assets/animations/blob2.json';

const { width, height } = Dimensions.get('window');
const BLOB_HEIGHT = 256;
const BLOB_WIDTH = 256;

const LandingScreenBackground = () => {
  const blobOne = useRef(null);
  const blobTwo = useRef(null);

  useEffect(() => {
    const blobOneTimeout = setTimeout(() => {
      blobOne.current.play();
    }, 500);
    const blobTwoTimeout = setTimeout(() => {
      blobTwo.current.play();
    }, 1500);

    return () => {
      clearTimeout(blobOneTimeout);
      clearTimeout(blobTwoTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.blobOneContainer}>
        <LottieView ref={blobOne} source={Blob1} autoPlay={false} style={styles.blob} />
      </View>
      <View style={styles.blobTwoContainer}>
        <LottieView
          ref={blobTwo}
          source={Blob2}
          autoPlay={false}
          style={[styles.blob, { transform: [{ rotate: '180deg' }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  blob: {
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  },
  blobOneContainer: {
    position: 'absolute',
    top: height - BLOB_HEIGHT,
    left: -BLOB_WIDTH / 2,
  },
  blobTwoContainer: {
    position: 'absolute',
    top: 75,
    left: width - BLOB_WIDTH / 2,
  },
});

export default LandingScreenBackground;
