import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components/native';
import HeaderFlatlist from 'library/components/HeaderFlatlist';
import StandardPressable from 'library/components/StandardPressable';
import { useAlert, useAuth, useSettings } from 'context';
import { Outlines, Theme, Typography } from 'library/styles';
import parseError from 'library/utils/parseError';
import { AlertType } from 'library/enums';
import SettingsIllustration from './components/SettingsIllustration';

const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
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
      default:
        return <View />;
    }
  };

  const renderModalOptionRow = (option, isSelected) => {
    return (
      <ModalOption
        key={option.value}
        onPress={() => {
          setShowModal(false);
          updateSetting(selectedSetting._id, option.value);
        }}
      >
        <OptionName>{option.label}</OptionName>
        <StyledCircleIcon name={isSelected ? 'dot-circle' : 'circle'} size={20} />
      </ModalOption>
    );
  };

  return (
    <>
      <HeaderFlatlist
        title='Settings'
        renderImage={() => <SettingsIllustration size='90%' />}
        data={settings}
        renderItem={renderSettingRow}
        ListFooterComponent={() => {
          return (
            <SettingCard onPress={attemptSignOut}>
              <SettingName>Sign Out</SettingName>
              {signingOut && <ActivityIndicator />}
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
  ${Typography.regular}
`;

const SettingValue = styled.Text`
  color: ${Theme.bodyTextColour};
  ${Typography.regular}
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
  ${Typography.regular}
`;

const StyledCircleIcon = styled(FontAwesome5)`
  color: ${Theme.bodyTextColour};
`;

export default SettingsScreen;
