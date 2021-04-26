import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import { useAnimatedAlert } from 'library/hooks';
import { AlertType } from 'library/enums';
import StatusLine from 'library/components/StatusLine';
import Spacer from 'library/components/Spacer';
import StandardPressable from './StandardPressable';

const alertTypeMap = {
  [AlertType.SUCCESS]: { title: 'Yay! Everything worked!', colour: '#21a67a' },
  [AlertType.WARNING]: { title: 'Uh oh, something went wrong', colour: '#f0a92e' },
};

const Alert = ({
  title,
  message,
  type,
  position = 'top',
  dismissAlert,
  isVisible,
  isStatusBarTranslucent = true,
  breathingSpace = 15,
}) => {
  const [alertHeight, setAlertHeight] = useState(undefined);
  const { animatedAlertStyle } = useAnimatedAlert({
    isVisible,
    isStatusBarTranslucent,
    position,
    alertHeight,
    breathingSpace,
  });
  const alertTitle = title || alertTypeMap[type]?.title;
  const alertColour = alertTypeMap[type]?.colour;

  return (
    <AlertContainer
      style={animatedAlertStyle}
      onLayout={event => {
        const { height: vHeight } = event.nativeEvent.layout;
        setAlertHeight(vHeight);
      }}
    >
      <StatusLine colour={alertColour} />
      <TextContainer>
        <Title>{alertTitle}</Title>
        <Spacer size={4} />
        <Message>{message}</Message>
      </TextContainer>
      <PressableIconContainer onPress={dismissAlert}>
        <StyledIcon name='close-outline' size={24} color={Colours.neutral.grey2} />
      </PressableIconContainer>
    </AlertContainer>
  );
};

const AlertContainer = styled(Animated.View)`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 5%;
  padding: 8px;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const TextContainer = styled.View`
  flex: 1;
  margin-vertical: 5px;
  padding-left: 10px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.Text`
  ${Typography.body}
  color: ${Theme.headerTextColour};
`;

const Message = styled.Text`
  ${Typography.body};
  color: #93959a;
`;

const PressableIconContainer = styled(StandardPressable)`
  flex: 0.25;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

const StyledIcon = styled(Ionicons)`
  padding-right: 10px;
`;

export default Alert;
