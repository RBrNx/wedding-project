import { Ionicons } from '@expo/vector-icons';
import { Colours, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import UserAvatar from 'react-native-user-avatar';
import { useAuth } from 'context';

const DashboardHeader = ({ title, style }) => {
  const { currentUser } = useAuth();
  const { firstName, lastName } = currentUser;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Container style={style}>
      <ScreenTitle>{title}</ScreenTitle>
      <NotificationIcon name='notifications-outline' size={24} color={Colours.neutral.grey2} />
      <UserAvatar size={42} name={fullName} />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
`;

const ScreenTitle = styled.Text`
  ${Typography.h4};
  ${Typography.boldFont};
  color: ${Colours.neutral.white};
  flex: 1;
`;

const NotificationIcon = styled(Ionicons)`
  margin-right: 15px;
`;

export default DashboardHeader;
