import Spacer from 'library/components/Spacer';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import theme from 'styled-theming';

const WeddingMenu = () => {
  return (
    <Card>
      <HeadingText>Wedding Menu</HeadingText>
      <Spacer size={25} />
      <MenuContainer>
        <DishName>Golden Lentil Soup</DishName>
        <DishDescription>Served with a bread roll</DishDescription>
        <Separator />
        <DishName>Supreme of Chicken Grampian</DishName>
        <DishDescription>Succulent Chicken, served with a peppercorn sauce</DishDescription>
        <Spacer size={25} />
        <DishName>Braised Featherblade of Beef</DishName>
        <DishDescription>Served with a Yorkshire pudding & red wine & shallot sauce</DishDescription>
        <Spacer size={25} />
        <DishDescription>
          All main courses served with chef&apos;s selection of seasonal vegetables and potatoes
        </DishDescription>
        <Separator />
        <DishName>Belgian Chocolate Brownie</DishName>
        <DishDescription>Served with ice cream</DishDescription>
      </MenuContainer>
    </Card>
  );
};

const Card = styled.View`
  width: 100%;
  padding: 5%;
  background-color: ${theme('theme', {
    light: Colours.neutral.offWhite,
    dark: Colours.neutral.grey5,
  })};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const MenuContainer = styled.View`
  align-items: center;
`;

const DishName = styled.Text`
  ${Typography.h4};
  ${Typography.boldFont};
  color: ${Theme.headerTextColour};
  text-align: center;
`;
const DishDescription = styled.Text`
  ${Typography.body};
  color: ${Theme.headerTextColour};
  text-align: center;
`;

const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${Theme.detailTextColour};
  width: 90%;
  margin-left: 5%;
  margin-vertical: 25px;
`;

export default WeddingMenu;
