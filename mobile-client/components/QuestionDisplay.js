import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardPressable from '../library/components/StandardPressable';

const QuestionDisplay = ({ question, index }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>{`Q${index}`}</Text>
      <Text style={styles.questionTitle}>{question.title}</Text>
      <View style={styles.choiceContainer}>
        {question.choices.map(choice => (
          <StandardPressable key={choice._id} style={styles.questionChoice}>
            <Text style={styles.choiceText}>{choice.label}</Text>
          </StandardPressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionNumber: {
    fontSize: 36,
    color: '#ccc',
  },
  questionTitle: {
    fontSize: 36,
    color: '#2991cc',
  },
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
  choiceText: {
    fontSize: 16,
  },
});

export default QuestionDisplay;
