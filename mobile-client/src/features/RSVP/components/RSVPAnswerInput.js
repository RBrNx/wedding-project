import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import StandardRadioInput from 'library/components/StandardRadioInput';
import StandardTextInput from 'library/components/StandardTextInput';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { useAvoidKeyboard } from 'library/hooks';
import SpotifySearchInput from './SpotifySearchInput';

const { width } = Dimensions.get('window');

const RSVPAnswerInput = ({
  questionId,
  questionType,
  label,
  placeholder,
  answerChoices,
  answerValue,
  setRSVPAnswer,
  index,
  animIndex,
  style,
}) => {
  const { expand, snapTo } = useBottomSheet();
  useAvoidKeyboard({ handleShow: () => expand(), handleHide: () => snapTo(0) });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (index - animIndex.value) * width }],
  }));

  return (
    <Container style={[animatedStyle, style]}>
      {!!answerChoices?.length && (
        <StandardRadioInput
          options={answerChoices}
          setSelectedValue={value => setRSVPAnswer(questionId, value)}
          selectedValue={answerValue}
        />
      )}
      {questionType === 'TEXT' && (
        <StandardTextInput
          value={answerValue}
          label={label}
          placeholder={placeholder}
          onChangeText={value => setRSVPAnswer(questionId, value)}
          flat
          multiline
          maxLength={300}
          showCharacterCount
        />
      )}
      {questionType === 'SONG_REQUEST' && (
        <SpotifySearchInput setSelectedSong={value => setRSVPAnswer(questionId, value)} selectedSong={answerValue} />
      )}
    </Container>
  );
};

const Container = styled(Animated.View)`
  position: absolute;
  width: 100%;
  padding-horizontal: 5%;
  padding-top: 15px;
`;

export default RSVPAnswerInput;
