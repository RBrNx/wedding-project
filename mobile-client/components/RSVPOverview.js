import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { constantStyles } from '../styles/theming';
import Spacer from '../library/components/Spacer';
import StandardRoundPressable from '../library/components/StandardRoundPressable';

const { width } = Dimensions.get('window');

const RSVPOverviewTitle = ({ index, animIndex }) => {
  const normalisedAnim = useDerivedValue(() => {
    return index - animIndex.value;
  });

  const animatedStepStyle = useAnimatedStyle(() => {
    const opacity = interpolate(normalisedAnim.value, [-0.5, 0, 0.5], [0, 1, 0], Extrapolate.CLAMP);
    const translateX = interpolate(normalisedAnim.value, [-0.5, 0, 0.5], [-15, 0, 15], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStepStyle]}>
      <Text style={styles.questionTitle}>Please review your answers</Text>
    </Animated.View>
  );
};

const RSVPOverview = ({ questions, formValues, onEditPress, index, animIndex, style }) => {
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = (index - animIndex.value) * width;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {questions.map((question, questionIndex) => {
        const isMultipleChoice = question?.choices?.length;
        const formValue = formValues[question._id];
        const answer = isMultipleChoice ? question.choices.find(choice => choice._id === formValue)?.label : formValue;

        return (
          <View style={[styles.card, { backgroundColor: colors.card }]} key={question._id}>
            <Text style={styles.questionNumber}>{`Q${questionIndex + 1}`}</Text>
            <Spacer size={10} />
            <View style={styles.textContainer}>
              <Text style={{ color: colors.bodyText, fontSize: 16, opacity: 0.9 }}>{question.title}</Text>
              <Spacer size={10} />
              <Text style={{ color: colors.secondary, fontSize: 18 }}>{answer}</Text>
            </View>
            <StandardRoundPressable
              size={45}
              icon={() => (
                <AntDesign name='edit' color={colors.componentBackground} size={25} style={{ alignSelf: 'center' }} />
              )}
              onPress={() => onEditPress(question, questionIndex)}
            />
          </View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    ...constantStyles.cardShadow,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  questionNumber: {
    color: '#ccc',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  header: {
    paddingLeft: '5%',
    paddingRight: '15%',
    paddingBottom: 30,
    height: 300,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
  questionTitle: {
    fontSize: 30,
    color: '#fff',
  },
});

export { RSVPOverviewTitle, RSVPOverview };
