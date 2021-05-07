import { Ionicons } from '@expo/vector-icons';
import { Colours, Typography } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import UserAvatar from 'react-native-user-avatar';

const DashboardHeader = ({ fullName }) => {
  return (
    <Container>
      <ScreenTitle>Dashboard</ScreenTitle>
      <NotificationIcon name='notifications-outline' size={24} color={Colours.neutral.grey2} />
      <UserAvatar size={42} name={fullName} />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
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
