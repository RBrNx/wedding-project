import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import FlatListAnimatedHeader from '../components/FlatListAnimatedHeader';
import SettingsIllustration from '../components/SVG/Settings';
import { useSettings } from '../components/SettingsContext';

const settings = [
  {
    _id: 'theme',
    title: 'Theme',
    options: [
      { label: 'Dark', value: 'dark' },
      { label: 'Light', value: 'light' },
      { label: 'System', value: 'system' },
    ],
  },
];

const SettingsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const { userSettings, saveUserSetting } = useSettings();
  const { colors } = useTheme();

  const renderItem = ({ item }) => {
    const selectedOption = item.options.find(option => option.value === userSettings[item._id]);

    return (
      <TouchableNativeFeedback
        onPress={() => {
          setSelectedSetting(item);
          setShowModal(true);
        }}
      >
        <View style={styles.settingsRow}>
          <Text>{item.title}</Text>
          <Text>{selectedOption?.label}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <>
      <FlatListAnimatedHeader title='Settings' renderImage={() => <SettingsIllustration size='90%' />} data={settings} renderItem={renderItem} />
      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)} useNativeDriver animationIn='fadeIn' animationOut='fadeOut'>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          {selectedSetting?.options?.map(option => (
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                saveUserSetting(selectedSetting._id, option.value);
              }}
              key={option.value}
            >
              <View style={styles.optionRow}>
                <Text>{option.label}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
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
  },
  modalContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  optionRow: {
    paddingVertical: 20,
    borderColor: '#ddd',
    borderTopWidth: 1,
    width: '100%',
  },
});

export default SettingsScreen;
