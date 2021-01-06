import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, Platform, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import ScannerCard from '../components/ScannerCard';
import { useAuth } from '../context';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ScannerScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [shortId, setShortId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithShortId } = useAuth();
  const screenRatio = windowHeight / windowWidth;

  const attemptSignIn = async scannedShortId => {
    try {
      setIsLoading(true);

      const signedIn = await signInWithShortId(scannedShortId || shortId);

      if (!signedIn) setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setScanned(false);
      console.log(err);
      Alert.alert('Oops!', err.message);
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    const invitationRegex = new RegExp(/(?:thewatsonwedding.com\/)(?<shortId>[A-Za-z0-9_-]{12})/g);
    // eslint-disable-next-line no-unused-vars
    const { shortId: scannedShortId } = invitationRegex.exec(data)?.groups;

    await attemptSignIn(scannedShortId);
  };

  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    }
    getCameraStatus();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3'; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      const distances = {};
      const realRatios = {};
      let minDistance = null;

      ratios.forEach(ratioString => {
        const parts = ratioString.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratioString] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratioString] = realRatio;
        if (minDistance == null) {
          minDistance = ratioString;
        } else if (distance >= 0 && distance < distances[minDistance]) {
          minDistance = ratioString;
        }
      });

      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor((windowHeight - realRatios[desiredRatio] * windowWidth) / 2);
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
        style={[styles.cameraPreview, { marginBottom: imagePadding + StatusBar.currentHeight }]}
        ratio={ratio}
        onCameraReady={async () => {
          if (!isRatioSet) {
            await prepareRatio();
          }
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        flashMode={flashEnabled ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
      />
      <ScannerCard
        onClose={() => navigation.pop()}
        onFlashPress={() => setFlashEnabled(!flashEnabled)}
        flashEnabled={flashEnabled}
        onSubmit={() => attemptSignIn()}
        shortId={shortId}
        setShortId={setShortId}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  cameraPreview: {
    flex: 1,
  },
});

export default ScannerScreen;
