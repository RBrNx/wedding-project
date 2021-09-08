import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import StandardButton from 'library/components/StandardButton';
import { Colours, Layout, Typography } from 'library/styles';
import LandingIllustration from './components/LandingIllustration';

const LandingScreen = ({ navigation }) => {
  return (
    <Container>
      <StyledLandingIllustration size='100%' />
      <Spacer size={50} />
      <HeadingContainer>
        <HeadingText>Welcome to the Future of Weddings.</HeadingText>
        <Spacer size={15} />
        <SubHeadingText>
          To get started you&apos;ll need your invitation which features your personalised QR code.
        </SubHeadingText>
      </HeadingContainer>
      <StandardButton
        text='Scan Invitation'
        raised
        icon={() => <StyledMaterialCommunityIcon name='qrcode-scan' size={22} color='white' />}
        onPress={() => navigation.navigate('Scanner')}
      />
      <Spacer size={10} />
      <ManageButton text='Manage my wedding' outline onPress={() => navigation.navigate('SignIn')} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-horizontal: 5%;
  ${Layout.safeArea};
`;

const StyledLandingIllustration = styled(LandingIllustration)`
  flex: 1;
  margin-top: 50px;
`;

const HeadingContainer = styled.View`
  flex: 1;
`;

const HeadingText = styled.Text`
  ${Typography.h1}
  text-align: center;
  color: ${Colours.neutral.white};
`;

const SubHeadingText = styled.Text`
  ${Typography.h4}
  text-align: center;
  color: ${Colours.neutral.grey2};
`;

const StyledMaterialCommunityIcon = styled(MaterialCommunityIcons)`
  margin-right: 15px;
`;

const ManageButton = styled(StandardButton).attrs(() => ({
  textStyle: {
    color: Colours.neutral.white,
  },
}))``;

export default LandingScreen;
