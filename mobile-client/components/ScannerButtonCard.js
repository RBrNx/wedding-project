import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import Animated from 'react-native-reanimated';
import StandardPressable from '../library/components/StandardPressable';
import Spacer from '../library/components/Spacer';
import useAvoidKeyboard from '../library/hooks/useAvoidKeyboard';

const ScannerButtonCard = ({ inKeyboardMode, setInKeyboardMode }) => {
  const { avoidKeyboardStyle } = useAvoidKeyboard();
  const { colors } = useTheme();

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: Color(colors.card)
            .fade(0.5)
            .toString(),
        },
        avoidKeyboardStyle,
      ]}
    >
      <StandardPressable
        style={[styles.button, inKeyboardMode ? {} : styles.selectedButton]}
        onPress={() => setInKeyboardMode(false)}
      >
        <Text style={styles.text}>Scan code</Text>
      </StandardPressable>
      <Spacer size={5} />
      <StandardPressable
        style={[styles.button, inKeyboardMode ? styles.selectedButton : {}]}
        onPress={() => setInKeyboardMode(true)}
      >
        <Text style={styles.text}>Enter code</Text>
      </StandardPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    padding: 8,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
});

export default ScannerButtonCard;
