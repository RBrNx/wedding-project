import Spacer from 'library/components/Spacer';
import StandardButton from 'library/components/StandardButton';
import StandardPressable from 'library/components/StandardPressable';
import { Layout, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { listNames } from '../helpers';

const DeletePrompt = ({ visible, onDismiss, invitation, onDelete, loading }) => {
  const guestNames = listNames(invitation?.guests.map(guest => guest.firstName));

  return (
    <Modal animationType='fade' transparent visible={visible} onRequestClose={onDismiss}>
      <ModalBackground onPress={onDismiss}>
        <ModalView>
          <PromptText>{`Are you sure you want to delete ${guestNames}'s invitation?`}</PromptText>
          <Spacer size={15} />
          <StandardButton text='Delete Invitation' raised onPress={onDelete} loading={loading} />
          <Spacer size={15} />
          <DimissButton text='Cancel' outline onPress={onDismiss} />
        </ModalView>
      </ModalBackground>
    </Modal>
  );
};

const ModalBackground = styled(StandardPressable)`
  ${Layout.absoluteFill};
  ${Layout.flexCenter};
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalView = styled.View`
  width: 90%;
  background-color: ${Theme.background};
  padding: 2.5%;
  ${Outlines.borderRadius};
  ${Layout.flexCenter};
`;

const PromptText = styled.Text`
  ${Typography.body};
  text-align: center;
`;

const DimissButton = styled(StandardButton).attrs(props => ({
  textStyle: {
    color: Theme.headerTextColour(props),
  },
}))``;

export default DeletePrompt;
