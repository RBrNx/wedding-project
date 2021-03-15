import { useTheme } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { constantStyles } from '../../styles/theming';
import StandardPressable from './StandardPressable';

const StandardRadioInput = ({ options, selectedValue, setSelectedValue }) => {
  const { colors } = useTheme();

  const selectedStyle = {
    borderColor: colors.secondary,
    backgroundColor: Color(colors.secondary)
      .fade(0.8)
      .string(),
  };

  return (
    <View style={styles.choiceContainer}>
      {options.map(option => {
        const isSelected = option._id === selectedValue;

        return (
          <StandardPressable
            key={option._id}
            style={[styles.questionChoice, { borderColor: colors.border }, isSelected ? selectedStyle : {}]}
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
    width: '100%',
  },
  questionChoice: {
    ...constantStyles.inputBorder,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  choiceText: {
    fontSize: 16,
  },
});

export default StandardRadioInput;
