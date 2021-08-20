import { useMutation } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useAlert, useAuth, useSettings } from 'context';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import REGISTER_PUSH_TOKEN from 'library/graphql/mutations/registerPushToken.graphql';
import StandardButton from 'library/components/StandardButton';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import DashboardHeader from './components/DashboardHeader';
import MemoriesCard from './components/MemoriesCard';
import RegistryCard from './components/RegistryCard';
import RSVPCard from './components/RSVPCard';
import ViewRSVPSheet from './components/ViewRSVPSheet';
import WeddingDetailsCard from './components/WeddingDetailsCard';
import NotificationAnimation from './components/NotificationAnimation';

const DashboardScreen = ({ navigation }) => {
  const [showRSVPSheet, setShowRSVPSheet] = useState(false);
  const [showPermissionCard, setShowPermissionCard] = useState(false);
  const [registerPushToken, { loading: registeringPushToken }] = useMutation(REGISTER_PUSH_TOKEN);
  const { currentUser, eventInfo } = useAuth();
  const { userSettings, updateSetting } = useSettings();
  const { showAlert } = useAlert();
  const { firstName, lastName } = currentUser || {};
  const fullName = `${firstName} ${lastName}`;
  const hasSubmittedRSVP = !!currentUser?.rsvpForm;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => setShowRSVPSheet(false), 1000);
      };
    }, []),
  );

  const dismissNotificationRequest = async () => {
    await updateSetting('pushNotifications', false);
    setShowPermissionCard(false);
  };

  const registerPushNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('User has denied permission for Push Notifications');
        setShowPermissionCard(false);
        return;
      }

      const { data: token } = await Notifications.getExpoPushTokenAsync();

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: Colours.secondary,
        });
      }

      const { data } = await registerPushToken({ variables: { token } });
      const { success } = data?.registerPushToken;

      updateSetting('pushNotifications', success);
      setShowPermissionCard(false);
    } catch (error) {
      const { message } = parseError(error);
      console.log(message);
      showAlert({ message, type: AlertType.WARNING });
    }
  };

  const askForNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    console.log({ status, device: Constants.isDevice });

    if (status !== 'granted' && Constants.isDevice) setShowPermissionCard(true);
  };

  useEffect(() => {
    if (userSettings.pushNotifications === null) setTimeout(askForNotificationPermission, 3000);
  }, []);

  return (
    <>
      <Container>
        <DashboardHeader title='Dashboard' />
        <Spacer size={40} />
        <HeadingText>{`Hello,\n${fullName} 👋`}</HeadingText>
        <Spacer size={40} />
        <RSVPCard
          hasSubmittedRSVP={hasSubmittedRSVP}
          eventDate={eventInfo?.date}
          onPress={() => {
            if (hasSubmittedRSVP) setShowRSVPSheet(true);
            else navigation.navigate('SubmitRSVP');
          }}
        />
        <Spacer size={20} />
        <MemoriesCard onPress={() => navigation.navigate('Memories')} />
        <Spacer size={20} />
        <WeddingDetailsCard onPress={() => navigation.navigate('Details')} />
        <Spacer size={20} />
        <RegistryCard onPress={() => navigation.navigate('Registry')} />
      </Container>
      <ViewRSVPSheet
        rsvpForm={currentUser?.rsvpForm}
        active={showRSVPSheet}
        onDismiss={() => setShowRSVPSheet(false)}
      />
      {showPermissionCard && (
        <PermissionCardBackground>
          <PermissionCard pointerEvents='box-none'>
            <PermissionText>
              We&apos;d like your permission to send you updates about the wedding, including important event
              information and new app features
            </PermissionText>
            <NotificationAnimation size={100} />
            <Spacer size={15} />
            <StandardButton
              text='Grant Permission'
              raised
              onPress={registerPushNotifications}
              loading={registeringPushToken}
            />
            <Spacer size={15} />
            <DimissButton text='No thanks' outline onPress={dismissNotificationRequest} />
          </PermissionCard>
        </PermissionCardBackground>
      )}
    </>
  );
};

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingTop: Layout.statusBarHeight,
    paddingBottom: 25,
  },
}))`
  flex: 1;
`;

const HeadingText = styled.Text`
  ${Typography.h1}
  text-align: left;
  color: ${Colours.neutral.white};
`;

const PermissionCardBackground = styled.View`
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
  background-color: rgba(0, 0, 0, 0.8);
`;

const PermissionCard = styled.View`
  width: 90%;
  background-color: ${Colours.neutral.white};
  ${Outlines.borderRadius};
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

const PermissionText = styled.Text`
  ${Typography.body};
  text-align: center;
`;

const DimissButton = styled(StandardButton).attrs(props => ({
  textStyle: {
    color: Theme.headerTextColour(props),
  },
}))``;

export default DashboardScreen;
