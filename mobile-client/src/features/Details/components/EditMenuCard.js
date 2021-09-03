/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components/native';
import Spacer from 'library/components/Spacer';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import theme from 'styled-theming';
import StandardButton from 'library/components/StandardButton';
import { StyleSheet } from 'react-native';
import StandardPressable from 'library/components/StandardPressable';
import { AntDesign } from '@expo/vector-icons';

const EditMenuCard = ({ menu, onPress }) => {
  return (
    <Card>
      <HeadingContainer>
        <HeadingText>Wedding Menu</HeadingText>
        {menu && (
          <EditButton size={40} onPress={onPress}>
            <EditIcon name='edit' size={25} />
          </EditButton>
        )}
      </HeadingContainer>
      <Spacer size={25} />
      {!menu && (
        <EmptyContainer>
          <EmptyDescription>Let your guests what the food choices are 🍽️</EmptyDescription>
          <Spacer size={30} />
          <StandardButton text='Add Menu' outline onPress={onPress} />
        </EmptyContainer>
      )}
      {menu &&
        menu?.map((course, index) => (
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

const HeadingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeadingText = styled.Text`
  ${Typography.h3};
  color: ${Theme.headerTextColour};
`;

const EditButton = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  ${Layout.flexCenter};
  ${props => Layout.round(props.size)}
`;

const EditIcon = styled(AntDesign)`
  color: ${Theme.icon};
`;
const EmptyContainer = styled.View`
  ${Layout.flexCenter};
`;

const EmptyDescription = styled.Text`
  ${Typography.h4};
  color: ${Theme.headerTextColour};
  text-align: center;
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

export default EditMenuCard;
