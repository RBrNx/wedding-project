import React, { useState } from 'react';
import { View, ActivityIndicator, Switch } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components/native';
import HeaderFlatlist from 'library/components/HeaderFlatlist';
import StandardPressable from 'library/components/StandardPressable';
import { useAlert, useAuth, useSettings } from 'context';
import { Layout, Outlines, Theme, Typography } from 'library/styles';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import SettingsIllustration from './components/SettingsIllustration';

const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { settings, userSettings, updateSetting } = useSettings();
  const { showAlert } = useAlert();
  const { signOut } = useAuth();

  const attemptSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
    } catch (err) {
      setSigningOut(false);
      const { message } = parseError(err);
      console.log(message);
      showAlert({
        message,
        type: AlertType.WARNING,
      });
    }
  };

  const changeSettingValue = async (setting, value) => {
    setIsLoading(true);
    setShowModal(false);
    setSelectedSetting(setting);
    await updateSetting(setting._id, value);
    setIsLoading(false);
    setSelectedSetting(null);
  };

  const renderSettingRow = ({ item }) => {
    switch (item.type) {
      case 'select':
        // eslint-disable-next-line no-case-declarations
        const selectedOption = item.options.find(option => option.value === userSettings[item._id]);

        return (
          <SettingCard
            onPress={() => {
              setSelectedSetting(item);
              setShowModal(true);
            }}
          >
            <SettingName>{item.title}</SettingName>
            <SettingValue>{selectedOption?.label}</SettingValue>
          </SettingCard>
        );
      case 'boolean':
        // eslint-disable-next-line no-case-declarations
        const isEnabled = userSettings[item._id];

        return (
          <SettingCard onPress={() => changeSettingValue(item, !isEnabled)}>
            <View style={{ flexDirection: 'row' }}>
              <SettingName>{item.title}</SettingName>
              {isLoading && selectedSetting._id === item._id && <StyledActivityIndicator />}
            </View>

            <Switch onValueChange={value => changeSettingValue(item, value)} value={isEnabled} />
          </SettingCard>
        );
      default:
        return <View />;
    }
  };

  const renderModalOptionRow = (option, isSelected) => {
    return (
      <ModalOption key={option.value} onPress={() => changeSettingValue(selectedSetting, option.value)}>
        <OptionName>{option.label}</OptionName>
        <StyledCircleIcon name={isSelected ? 'dot-circle' : 'circle'} size={20} />
      </ModalOption>
    );
  };

  return (
    <>
      <StyledDashboardHeader title='Settings' />
      <HeaderFlatlist
        title='Settings'
        renderImage={() => <SettingsIllustration size='90%' />}
        data={settings}
        renderItem={renderSettingRow}
        ListFooterComponent={() => {
          return (
            <SettingCard onPress={attemptSignOut}>
              <SettingName>Sign Out</SettingName>
              {signingOut && <StyledActivityIndicator />}
            </SettingCard>
          );
        }}
      />
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        useNativeDriver
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <ModalContainer>
          {selectedSetting?.options?.map(option => {
            const isSelected = option.value === userSettings[selectedSetting._id];
            return renderModalOptionRow(option, isSelected);
          })}
        </ModalContainer>
      </Modal>
    </>
  );
};

const StyledDashboardHeader = styled(DashboardHeader)`
  padding-horizontal: 5%;
  margin-top: ${Layout.statusBarHeight}px;
`;

const SettingCard = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-horizontal: 20px;
  margin-bottom: 10px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
`;

const SettingName = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.body}
`;

const SettingValue = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.body}
`;

const ModalContainer = styled.View`
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  overflow: hidden;
`;

const ModalOption = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: ${Theme.card};
`;

const OptionName = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.body}
`;

const StyledCircleIcon = styled(FontAwesome5)`
  color: ${Theme.bodyTextColour};
`;

const StyledActivityIndicator = styled(ActivityIndicator).attrs(props => ({
  color: Theme.detailTextColour(props),
}))``;

export default SettingsScreen;
