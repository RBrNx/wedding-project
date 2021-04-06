import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import AlternativeTextInput from '../library/components/AlternativeTextInput';
import StandardRoundPressable from '../library/components/StandardRoundPressable';

const { height } = Dimensions.get('window');

const ScannerInputCard = ({ scannerModeIndex, invitationId, setInvitationId, onSubmit, isLoading }) => {
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scannerModeIndex.value, [0.5, 1], [25, 0], Extrapolate.CLAMP) }],
    opacity: interpolate(scannerModeIndex.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AlternativeTextInput
        inputStyle={styles.input}
        label='Invitation ID'
        placeholder='E.g epYchHq5k86l'
        value={invitationId}
        onChangeText={value => setInvitationId(value)}
      />
      <StandardRoundPressable
        colour={colors.button}
        onPress={onSubmit}
        style={styles.submitButton}
        icon={() =>
          isLoading ? <ActivityIndicator color='#fff' /> : <Ionicons name='checkmark-sharp' size={24} color='#fff' />
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    top: height * 0.4,
  },
  submitButton: {
    position: 'absolute',
    right: 5,
    backgroundColor: '#2991cc',
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScannerInputCard;
