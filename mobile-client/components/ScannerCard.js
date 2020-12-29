import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import StandardPressable from '../library/components/StandardPressable';

const ScannerCard = ({ onKeyboardPress, onFlashPress, onClose, flashEnabled }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, styles.scannerCard, { backgroundColor: colors.card }]}>
      <StandardPressable
        onPress={onKeyboardPress}
        style={[styles.icon, { backgroundColor: colors.componentBackground }]}
        pressedStyle={{ backgroundColor: colors.cardHover }}
      >
        <FontAwesome5 name='keyboard' size={24} color={colors.text} />
      </StandardPressable>
      <StandardPressable
        onPress={onClose}
        style={[styles.icon, { backgroundColor: colors.componentBackground }]}
        pressedStyle={{ backgroundColor: colors.cardHover }}
      >
        <Ionicons name='close-outline' size={36} color={colors.text} />
      </StandardPressable>
      <StandardPressable
        onPress={onFlashPress}
        style={[styles.icon, { backgroundColor: colors.componentBackground }]}
        pressedStyle={{ backgroundColor: colors.cardHover }}
      >
        <Ionicons name={flashEnabled ? 'flash-outline' : 'flash-off-outline'} size={24} color={colors.text} />
      </StandardPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '20%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  scannerCard: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    padding: 10,
    borderRadius: 30,
  },
});

export default ScannerCard;
