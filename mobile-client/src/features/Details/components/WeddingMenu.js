/* eslint-disable react/no-array-index-key */
import Spacer from 'library/components/Spacer';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import theme from 'styled-theming';

const WeddingMenu = ({ menu }) => {
  return (
    <Card>
      <HeadingText>Wedding Menu</HeadingText>
      <Spacer size={25} />
      <MenuContainer>
        {menu?.map((course, index) => (
          <React.Fragment key={index}>
            {course.choices.map((choice, choiceIndex) => (
              <React.Fragment key={choiceIndex}>
                <DishName>{choice.name}</DishName>
                <DishDescription>{choice.description}</DishDescription>
                {choiceIndex < course.choices.length - 1 && <Spacer size={25} />}
              </React.Fragment>
            ))}
            {course.info && (
              <>
                <Spacer size={25} />
                <DishDescription>{course.info}</DishDescription>
              </>
            )}
            {index < menu.length - 1 && <Separator />}
          </React.Fragment>
        ))}
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
