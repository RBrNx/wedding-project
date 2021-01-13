import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardPressable from './StandardPressable';

const StandardRadioInput = ({ options, selectedValue, setSelectedValue }) => {
  const { colors } = useTheme();

  const selectedStyle = {
    borderColor: colors.secondary,
    backgroundColor: Color(colors.secondary)
      .lighten(0.75)
      .toString(),
  };

  return (
    <View style={styles.choiceContainer}>
      {options.map(option => {
        const isSelected = option._id === selectedValue;

        return (
          <StandardPressable
            key={option._id}
            style={[styles.questionChoice, isSelected ? selectedStyle : {}]}
            onPress={() => setSelectedValue(option._id)}
          >
            <Text style={[styles.choiceText, { color: colors.bodyText }]}>{option.label}</Text>
          </StandardPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionChoice: {
    borderRadius: 5,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 15,
    width: '100%',
  },
  selectedChoice: {
    borderColor: '#2991cc',
    backgroundColor: Color('#2991cc')
      .lighten(0.75)
      .toString(),
  },
  choiceText: {
    fontSize: 16,
  },
});

export default StandardRadioInput;
