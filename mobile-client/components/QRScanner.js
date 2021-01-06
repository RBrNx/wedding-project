import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import qrScanAnimation from '../assets/animations/qrScanner.json';

const QRScanner = ({ size, style }) => (
  <View style={[styles.container, { height: size || 50, width: size || 50 }, style]}>
    <LottieView source={qrScanAnimation} autoPlay loop speed={1} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRScanner;
