import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import StandardButton from 'library/components/StandardButton';
import { Colours, Typography } from 'library/styles';
import LandingIllustration from './components/LandingIllustration';

const LandingScreen = ({ navigation }) => {
  return (
    <Container>
      <StyledLandingIllustration size='100%' />
      <Spacer size={50} />
      <HeadingContainer>
        <HeadingText>Welcome to the Watson Wedding.</HeadingText>
        <Spacer size={15} />
        <SubHeadingText>
          Get started by scanning the QR Code on your invitation, or sign in to your existing account.
        </SubHeadingText>
      </HeadingContainer>
      <StandardButton
        text='Scan Invitation'
        raised
        icon={() => <StyledMaterialCommunityIcon name='qrcode-scan' size={22} color='white' />}
        onPress={() => navigation.navigate('Scanner')}
      />
      <Separator />
      <StandardButton text='I already have an account' raised onPress={() => navigation.navigate('SignIn')} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: 5%;
  padding-bottom: 25px;
`;

const StyledLandingIllustration = styled(LandingIllustration)`
  flex: 1;
  margin-top: 50px;
`;

const HeadingContainer = styled.View`
  flex: 1;
  padding-horizontal: 5%;
`;

const HeadingText = styled.Text`
  ${Typography.h1}
  text-align: center;
  color: ${Colours.neutral.white};
`;

const SubHeadingText = styled.Text`
  ${Typography.h4}
  text-align: center;
  color: ${Colours.neutral.grey3};
`;

const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${Colours.neutral.white};
  margin-vertical: 10px;
  width: 90%;
`;

const StyledMaterialCommunityIcon = styled(MaterialCommunityIcons)`
  margin-right: 15px;
`;

export default LandingScreen;
