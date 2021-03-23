import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { constantStyles } from '../../styles/theming';

const StandardButton = ({ onPress, raised, text, loading, icon }) => {
  const [buttonHeight, setButtonHeight] = useState(0);
  const { colors } = useTheme();
  const backgroundColor = colors.secondary;
  const pressedColour = Color(colors.secondary)
    .darken(0.2)
    .toString();

  const renderButtonStyles = ({ pressed }) => {
    const buttonStyles = [
      styles.button,
      {
        backgroundColor: pressed ? pressedColour : backgroundColor,
        borderRadius: buttonHeight / 2,
      },
    ];

    if (raised) buttonStyles.push({ ...constantStyles.inputShadow });

    return buttonStyles;
  };

  return (
    <Pressable
      style={renderButtonStyles}
      onPress={onPress}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height);
      }}
    >
      <View style={{ opacity: 0 }}>{!loading && icon && icon()}</View>
      {!loading && <Text style={styles.text}>{text}</Text>}
      {!loading && icon && icon()}
      {loading && <ActivityIndicator color='#fff' style={styles.loadingSpinner} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
  loadingSpinner: {
    paddingVertical: 15,
  },
});

export default StandardButton;
