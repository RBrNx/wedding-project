import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import FlatListAnimatedHeader from '../components/FlatListAnimatedHeader';
import SettingsIllustration from '../components/SVG/Settings';
import { useSettings } from '../components/SettingsContext';
import TouchableNative from '../components/TouchableNative';

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

  const renderSettingRow = ({ item }) => {
    const selectedOption = item.options.find(option => option.value === userSettings[item._id]);

    return (
      <TouchableNative
        onPress={() => {
          setSelectedSetting(item);
          setShowModal(true);
        }}
      >
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <Text style={{ color: colors.headerText }}>{item.title}</Text>
          <Text style={{ color: colors.bodyText }}>{selectedOption?.label}</Text>
        </View>
      </TouchableNative>
    );
  };

  const renderOptionRow = (option, isSelected) => {
    return (
      <TouchableNative
        onPress={() => {
          setShowModal(false);
          saveUserSetting(selectedSetting._id, option.value);
        }}
        key={option.value}
      >
        <View style={styles.optionRow}>
          <Text style={{ color: colors.bodyText }}>{option.label}</Text>
          <FontAwesome5 style={{ color: colors.bodyText }} name={isSelected ? 'dot-circle' : 'circle'} size={20} />
        </View>
      </TouchableNative>
    );
  };

  return (
    <>
      <FlatListAnimatedHeader
        title='Settings'
        renderImage={() => <SettingsIllustration size='90%' />}
        data={settings}
        renderItem={renderSettingRow}
      />
      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)} useNativeDriver animationIn='fadeIn' animationOut='fadeOut'>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          {selectedSetting?.options?.map(option => {
            const isSelected = option.value === userSettings[selectedSetting._id];
            return renderOptionRow(option, isSelected);
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
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  modalContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    width: '100%',
  },
});

export default SettingsScreen;
