import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import FlatListAnimatedHeader from '../components/FlatListAnimatedHeader';
import SettingsIllustration from '../components/SVG/Settings';

const SettingsScreen = () => {
  const [userSettings, setUserSettings] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      setUserSettings({ ...savedSettings, ...{ theme: 'system' } });
    };

    loadSettings();
  }, []);

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
        <View style={styles.modalContainer}>
          {selectedSetting?.options?.map(option => (
            <TouchableNativeFeedback
              onPress={() => {
                setUserSettings({ ...userSettings, [selectedSetting._id]: option.value });
                setShowModal(false);
              }}
            >
              <View key={option._id} style={styles.optionRow}>
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
    backgroundColor: 'white',
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
