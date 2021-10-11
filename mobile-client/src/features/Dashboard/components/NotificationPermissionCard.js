import React from 'react';
import Spacer from 'library/components/Spacer';
import StandardButton from 'library/components/StandardButton';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import styled from 'styled-components';
import NotificationAnimation from './NotificationAnimation';

const NotificationPermissionCard = ({ loading, onGrant, onDismiss }) => {
  return (
    <PermissionCardBackground>
      <PermissionCard pointerEvents='box-none'>
        <PermissionText>
          We&apos;d like your permission to send you updates about the wedding, including important event information
          and new app features
        </PermissionText>
        <NotificationAnimation size={100} />
        <Spacer size={15} />
        <StandardButton text='Grant Permission' raised onPress={onGrant} loading={loading} />
        <Spacer size={15} />
        <DimissButton text='No thanks' outline onPress={onDismiss} />
      </PermissionCard>
    </PermissionCardBackground>
  );
};

const PermissionCardBackground = styled.View`
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
  background-color: rgba(0, 0, 0, 0.8);
`;

const PermissionCard = styled.View`
  width: 90%;
  background-color: ${Colours.neutral.white};
  ${Outlines.borderRadius};
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

const PermissionText = styled.Text`
  ${Typography.body};
  text-align: center;
`;

const DimissButton = styled(StandardButton).attrs(props => ({
  textStyle: {
    color: Theme.headerTextColour(props),
  },
}))``;

export default NotificationPermissionCard;
