import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Color from 'color';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import StandardPressable from '../library/components/StandardPressable';
import Spacer from '../library/components/Spacer';
import useAvoidKeyboard from '../library/hooks/useAvoidKeyboard';

const ScannerButtonCard = ({ scannerModeIndex, onButtonPress }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const { avoidKeyboardStyle } = useAvoidKeyboard();
  const { colors } = useTheme();

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const initialPadding = styles.card.padding;
    const spacing = scannerModeIndex.value * 5;
    const xPosition = scannerModeIndex.value * buttonWidth;

    return {
      transform: [{ translateX: initialPadding + xPosition + spacing }],
    };
  });

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
      <Animated.View style={[styles.buttonBackground, animatedBackgroundStyle, { width: buttonWidth }]} />
      <StandardPressable
        style={[styles.button]}
        onPress={() => onButtonPress(0)}
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          setButtonWidth(width);
        }}
      >
        <Text style={styles.text}>Scan code</Text>
      </StandardPressable>
      <Spacer size={5} />
      <StandardPressable style={[styles.button]} onPress={() => onButtonPress(1)}>
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
  buttonBackground: {
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    height: '100%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
});

export default ScannerButtonCard;
