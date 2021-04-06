import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, Alert, Linking, Vibration } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';
import ScannerButtonCard from '../components/ScannerButtonCard';
import { useAuth } from '../context';
import QRScanner from '../components/QRScanner';
import StandardButton from '../library/components/StandardButton';
import CameraViewfinder from '../components/CameraViewfinder';
import StandardPressable from '../library/components/StandardPressable';
import ScannerHeading from '../components/ScannerHeading';
import StepTransition from '../library/components/StepTransition';
import useAnimatedStepTransition from '../library/hooks/useAnimatedStepTransition';
import DismissKeyboard from '../library/components/DismissKeyboard';
import ScannerInputCard from '../components/ScannerInputCard';

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
  const [showCamera, setShowCamera] = useState(false);
  const { signInWithShortId } = useAuth();
  const { animIndex: scannerModeIndex, moveToStep } = useAnimatedStepTransition({
    duration: 200,
    easing: Easing.out(Easing.ease),
  });

  const screenRatio = windowHeight / windowWidth;
  const scannerModeHeadings = [
    { heading: 'Scan QR Code', subHeading: 'Scan the QR code from your invitation, or enter the code manually.' },
    {
      heading: 'Enter Invitation ID',
      subHeading: 'Enter the 12 digit code from your Invitation, or scan the QR Code.',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <StandardPressable onPress={() => setFlashEnabled(!flashEnabled)} style={{ marginRight: 15 }}>
          <Ionicons name={flashEnabled ? 'flash-outline' : 'flash-off-outline'} size={24} color='#fff' />
        </StandardPressable>
      ),
    });
  }, [navigation, flashEnabled]);

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
    Vibration.vibrate();
    setScanned(true);

    const invitationRegex = new RegExp(/(?:thewatsonwedding.com\/)(?<shortId>[A-Za-z0-9_-]{12})/g);
    const { shortId: scannedShortId } = invitationRegex.exec(data)?.groups || {};

    await attemptSignIn(scannedShortId);
  };

  const askForCameraPermission = async manuallyTriggered => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(status === 'granted');

    if (status === 'denied' && manuallyTriggered) Linking.openSettings();
  };

  useEffect(() => {
    askForCameraPermission();
    setTimeout(() => {
      setShowCamera(true);
    }, 500);
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

  const renderHeading = ({ step, index }) => {
    const { heading, subHeading } = step;
    return (
      <ScannerHeading
        key={index}
        heading={heading}
        subHeading={subHeading}
        scannerModeIndex={scannerModeIndex}
        index={index}
      />
    );
  };

  return (
    <DismissKeyboard style={[styles.container, !hasPermission ? { alignItems: 'center' } : {}]}>
      {!hasPermission && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            To scan your invitation, we require your permission to access the Camera
          </Text>
          <QRScanner size={400} />
          <StandardButton text='Grant Permission' raised onPress={() => askForCameraPermission(true)} />
        </View>
      )}
      {hasPermission && showCamera && (
        <>
          <Camera
            ref={cameraRef}
            barCodeScannerSettings={{
              barCodeTypes: ['qr'],
            }}
            style={[styles.cameraPreview, { width: windowWidth + imagePadding }]}
            ratio={ratio}
            onCameraReady={async () => {
              if (!isRatioSet) {
                await prepareRatio();
              }
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            flashMode={flashEnabled ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
            autoFocus={Camera.Constants.AutoFocus.on}
          />
        </>
      )}
      <CameraViewfinder scannerModeIndex={scannerModeIndex} />
      <StepTransition steps={scannerModeHeadings} renderStep={renderHeading} animIndex={scannerModeIndex} />
      <ScannerInputCard
        scannerModeIndex={scannerModeIndex}
        shortId={shortId}
        setShortId={setShortId}
        onSubmit={() => attemptSignIn()}
        isLoading={isLoading}
      />
      <ScannerButtonCard scannerModeIndex={scannerModeIndex} onButtonPress={index => moveToStep(index)} />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cameraPreview: {
    ...StyleSheet.absoluteFill,
  },
  permissionContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  permissionText: {
    textAlign: 'center',
  },
});

export default ScannerScreen;
