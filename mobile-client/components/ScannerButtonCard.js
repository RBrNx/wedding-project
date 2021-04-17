import React, { useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import styled from 'styled-components/native';
import StandardPressable from '../library/components/StandardPressable';
import Spacer from '../library/components/Spacer';
import useAvoidKeyboard from '../library/hooks/useAvoidKeyboard';
import { Colours, Outlines, Typography } from '../styles';
import { fade } from '../library/helpers/colours';

const ScannerButtonCard = ({ scannerModeIndex, onButtonPress }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const { avoidKeyboardStyle } = useAvoidKeyboard();

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const initialPadding = 8;
    const spacing = scannerModeIndex.value * 5;
    const xPosition = scannerModeIndex.value * buttonWidth;

    return {
      transform: [{ translateX: initialPadding + xPosition + spacing }],
    };
  });

  return (
    <ButtonContainer style={avoidKeyboardStyle}>
      <ButtonBackground style={[animatedBackgroundStyle, { width: buttonWidth }]} />
      <Button
        onPress={() => onButtonPress(0)}
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          setButtonWidth(width);
        }}
      >
        <ButtonText>Scan code</ButtonText>
      </Button>
      <Spacer size={5} />
      <Button onPress={() => onButtonPress(1)}>
        <ButtonText>Enter code</ButtonText>
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 90%;
  ${Outlines.borderRadius}
  position: absolute;
  bottom: 15px;
  padding: 8px;
  background-color: ${fade(Colours.neutral.white, 0.2)};
`;

const Button = styled(StandardPressable)`
  padding: 15px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonBackground = styled(Animated.View)`
  ${Outlines.borderRadius}
  position: absolute;
  height: 100%;
  background-color: ${Colours.neutral.white};
`;

const ButtonText = styled.Text`
  ${Typography.regular}
`;

export default ScannerButtonCard;
