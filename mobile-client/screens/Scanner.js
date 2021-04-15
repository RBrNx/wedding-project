import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Dimensions, Platform, Linking, Vibration, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import ScannerButtonCard from '../components/ScannerButtonCard';
import { useAuth, useAlert } from '../context';
import QRScanner from '../components/QRScanner';
import StandardButton from '../library/components/StandardButton';
import CameraViewfinder from '../components/CameraViewfinder';
import StandardPressable from '../library/components/StandardPressable';
import ScannerModeHeading from '../components/ScannerModeHeading';
import StepTransition from '../library/components/StepTransition';
import useAnimatedStepTransition from '../library/hooks/useAnimatedStepTransition';
import DismissKeyboard from '../library/components/DismissKeyboard';
import ScannerInputCard from '../components/ScannerInputCard';
import LoadingIndicator from '../library/components/LoadingIndicator';
import { AlertType } from '../library/enums';
import { Colours, Layout, Outlines } from '../styles';
import parseError from '../library/helpers/parseError';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ScannerScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [invitationId, setInvitationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { signInWithInvitationId } = useAuth();
  const { showAlert } = useAlert();
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

  const animatedLoadingStyles = useAnimatedStyle(() => {
    const hasScannedQRCode = isLoading && scannerModeIndex.value === 0;

    return {
      opacity: withTiming(hasScannedQRCode ? 1 : 0, { duration: 200, easing: Easing.out(Easing.exp) }),
    };
  });
  const animatedPermissionStyles = useAnimatedStyle(() => ({
    opacity: interpolate(scannerModeIndex.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  }));

  const attemptSignIn = async scannedInvitationId => {
    try {
      setIsLoading(true);

      const signedIn = await signInWithInvitationId(scannedInvitationId || invitationId);

      if (!signedIn) setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setScanned(false);

      const { message } = parseError(err);
      console.log(message);
      showAlert({
        message,
        type: AlertType.WARNING,
      });
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    Vibration.vibrate();
    setScanned(true);

    const invitationRegex = new RegExp(/(?:thewatsonwedding.com\/)(?<invitationId>[A-Za-z0-9_-]{12})/g);
    const { invitationId: scannedInvitationId } = invitationRegex.exec(data)?.groups || {};

    await attemptSignIn(scannedInvitationId);
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
      <ScannerModeHeading
        key={index}
        heading={heading}
        subHeading={subHeading}
        scannerModeIndex={scannerModeIndex}
        index={index}
      />
    );
  };

  return (
    <StyledDismissKeyboard>
      {!hasPermission && (
        <PermissionCard style={animatedPermissionStyles} pointerEvents='box-none'>
          <PermissionText>To scan your invitation, we require your permission to access the Camera</PermissionText>
          <QRScanner size={100} />
          <StandardButton text='Grant Permission' raised onPress={() => askForCameraPermission(true)} />
        </PermissionCard>
      )}
      {hasPermission && showCamera && (
        <>
          <StyledCamera
            ref={cameraRef}
            style={{ width: windowWidth + imagePadding }}
            ratio={ratio}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            flashMode={flashEnabled ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
            autoFocus={Camera.Constants.AutoFocus.on}
            barCodeScannerSettings={{
              barCodeTypes: ['qr'],
            }}
            onCameraReady={async () => {
              if (!isRatioSet) {
                await prepareRatio();
              }
            }}
          />
        </>
      )}
      <CameraViewfinder scannerModeIndex={scannerModeIndex} />
      <LoadingCard style={animatedLoadingStyles} pointerEvents='none'>
        <LoadingIndicator size={100} />
      </LoadingCard>
      <StepTransition steps={scannerModeHeadings} renderStep={renderHeading} animIndex={scannerModeIndex} />
      <ScannerInputCard
        scannerModeIndex={scannerModeIndex}
        invitationId={invitationId}
        setInvitationId={setInvitationId}
        onSubmit={() => attemptSignIn()}
        isLoading={isLoading}
      />
      <ScannerButtonCard scannerModeIndex={scannerModeIndex} onButtonPress={index => moveToStep(index)} />
    </StyledDismissKeyboard>
  );
};

const StyledDismissKeyboard = styled(DismissKeyboard)`
  height: ${windowHeight}px;
  align-items: center;
`;

const LoadingCard = styled(Animated.View)`
  background-color: ${Colours.neutral.white};
  ${Outlines.borderRadius};
  position: absolute;
  ${Layout.flexCenter};
  top: ${windowHeight / 2 - 125 + StatusBar.currentHeight}px;
  height: 250px;
  width: 250px;
  z-index: 1;
`;

const PermissionCard = styled(Animated.View)`
  width: 90%;
  background-color: ${Colours.neutral.white};
  ${Outlines.borderRadius};
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 2;
  height: 300px;
  top: ${windowHeight / 2 - 150 + StatusBar.currentHeight}px;
`;

const PermissionText = styled.Text`
  text-align: center;
`;

const StyledCamera = styled(Camera)`
  ${Layout.absoluteFill};
`;

export default ScannerScreen;
