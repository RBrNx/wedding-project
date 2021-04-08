import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import AlternativeTextInput from '../library/components/AlternativeTextInput';
import StandardRoundPressable from '../library/components/StandardRoundPressable';
import { Layout } from '../styles';

const { height } = Dimensions.get('window');

const ScannerInputCard = ({ scannerModeIndex, invitationId, setInvitationId, onSubmit, isLoading }) => {
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scannerModeIndex.value, [0.5, 1], [25, 0], Extrapolate.CLAMP) }],
    opacity: interpolate(scannerModeIndex.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <InputContainer style={animatedContainerStyle}>
      <AlternativeTextInput
        label='Invitation ID'
        placeholder='E.g epYchHq5k86l'
        value={invitationId}
        onChangeText={value => setInvitationId(value)}
      />
      <SubmitButton
        onPress={onSubmit}
        icon={() =>
          isLoading ? <ActivityIndicator color='#fff' /> : <Ionicons name='checkmark-sharp' size={24} color='#fff' />
        }
      />
    </InputContainer>
  );
};

const InputContainer = styled(Animated.View)`
  width: 250px;
  top: ${height * 0.4}px;
  ${Layout.flexCenter}
`;

const SubmitButton = styled(StandardRoundPressable)`
  position: absolute;
  right: 5px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  padding: 10px;
  ${Layout.flexCenter}
`;

export default ScannerInputCard;
