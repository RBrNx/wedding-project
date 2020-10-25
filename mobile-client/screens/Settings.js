import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import FlatListAnimatedHeader from '../library/components/FlatListAnimatedHeader';
import SettingsIllustration from '../components/SVG/Settings';
import StandardPressable from '../library/components/StandardPressable';
import { useAuth, useSettings } from '../context';

const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [signingOut, setSigningOut] = useState(false);
  const { settings, userSettings, updateSetting } = useSettings();
  const { colors } = useTheme();
  const { signOut } = useAuth();

  const attemptSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
    } catch (err) {
      console.log(err);
      setSigningOut(false);
    }
  };

  const renderSettingRow = ({ item }) => {
    switch (item.type) {
      case 'select':
        // eslint-disable-next-line no-case-declarations
        const selectedOption = item.options.find(option => option.value === userSettings[item._id]);

        return (
          <StandardPressable
            onPress={() => {
              setSelectedSetting(item);
              setShowModal(true);
            }}
            style={[styles.settingsRow, { backgroundColor: colors.card }]}
            pressedStyle={{ backgroundColor: colors.cardHover }}
          >
            <Text style={{ color: colors.headerText }}>{item.title}</Text>
            <Text style={{ color: colors.bodyText }}>{selectedOption?.label}</Text>
          </StandardPressable>
        );
      default:
        return <View />;
    }
  };

  const renderModalOptionRow = (option, isSelected) => {
    return (
      <StandardPressable
        style={styles.optionRow}
        pressedStyle={{ backgroundColor: colors.cardHover }}
        onPress={() => {
          setShowModal(false);
          updateSetting(selectedSetting._id, option.value);
        }}
        key={option.value}
      >
        <Text style={{ color: colors.bodyText }}>{option.label}</Text>
        <FontAwesome5 style={{ color: colors.bodyText }} name={isSelected ? 'dot-circle' : 'circle'} size={20} />
      </StandardPressable>
    );
  };

  return (
    <>
      <FlatListAnimatedHeader
        title='Settings'
        renderImage={() => <SettingsIllustration size='90%' />}
        data={settings}
        renderItem={renderSettingRow}
        ListFooterComponent={() => {
          return (
            <StandardPressable
              onPress={attemptSignOut}
              style={[styles.settingsRow, { backgroundColor: colors.card }]}
              pressedStyle={{ backgroundColor: colors.cardHover }}
            >
              <Text style={{ color: colors.headerText }}>Sign Out</Text>
              {signingOut && <ActivityIndicator />}
            </StandardPressable>
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
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          {selectedSetting?.options?.map(option => {
            const isSelected = option.value === userSettings[selectedSetting._id];
            return renderModalOptionRow(option, isSelected);
          })}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  modalContainer: {
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  outerOptionRow: {
    borderRadius: 0,
  },
});

export default SettingsScreen;
