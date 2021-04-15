import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import StatusLine from '../../components/StatusLine';
import { Colours, Outlines, Theme, Typography } from '../../styles';
import { AlertType } from '../enums';
import useAnimatedAlert from '../hooks/useAnimatedAlert';
import Spacer from './Spacer';

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
  const [alertHeight, setAlertHeight] = useState(0);
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
        <StyledIcon name='close-outline' size={24} color={Colours.neutral.grey3} />
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
  ${Typography.regular}
  color: ${Theme.headerTextColour};
`;

const Message = styled.Text`
  ${Typography.regular};
  color: #93959a;
`;

const PressableIconContainer = styled(Pressable)`
  flex: 0.25;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

const StyledIcon = styled(Ionicons)`
  padding-right: 10px;
`;

export default Alert;
