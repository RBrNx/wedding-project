import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import StandardPressable from '../library/components/StandardPressable';
import StandardInput from '../library/components/StandardInput';

const ScannerCard = ({ onFlashPress, flashEnabled, onClose }) => {
  const [inKeyboardMode, setInKeyboardMode] = useState(false);
  const [shortId, setShortId] = useState(null);
  const { colors } = useTheme();

  return (
    <View style={[styles.card, styles.scannerCard, { backgroundColor: colors.card }]}>
      {inKeyboardMode && (
        <>
          <StandardPressable
            onPress={() => setInKeyboardMode(!inKeyboardMode)}
            style={[styles.icon, { backgroundColor: colors.componentBackground, marginLeft: 15 }]}
            pressedStyle={{ backgroundColor: colors.cardHover }}
          >
            <Ionicons name='arrow-back-outline' size={24} color={colors.text} />
          </StandardPressable>
          <StandardInput
            value={shortId}
            label='Invitation ID'
            onChangeText={value => setShortId(value)}
            maxLength={12}
            containerStyle={{ flex: 1, marginHorizontal: 20 }}
            inputStyle={{ marginBottom: 0 }}
          />
          <StandardPressable
            onPress={() => setInKeyboardMode(!inKeyboardMode)}
            style={[styles.icon, { backgroundColor: colors.componentBackground, marginRight: 15 }]}
            pressedStyle={{ backgroundColor: colors.cardHover }}
          >
            <Ionicons name='enter-outline' size={24} color={colors.text} />
          </StandardPressable>
        </>
      )}
      {!inKeyboardMode && (
        <>
          <StandardPressable
            onPress={() => setInKeyboardMode(!inKeyboardMode)}
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
        </>
      )}
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
    flex: 1,
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
