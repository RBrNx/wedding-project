import React from 'react';
import styled from 'styled-components/native';
import theme from 'styled-theming';
import { Colours, Layout, Outlines, Theme, Typography } from 'library/styles';
import { darken, lighten } from 'library/utils/colours';
import StandardPressable from 'library/components/StandardPressable';
import Spacer from 'library/components/Spacer';

const StandardRadioInput = ({ options, selectedValue, setSelectedValue }) => {
  return (
    <ChoiceContainer>
      {options.map((option, index) => {
        const isSelected = option._id === selectedValue;

        return (
          <React.Fragment key={option._id}>
            <StyledStandardPressable isSelected={isSelected} onPress={() => setSelectedValue(option._id)}>
              <ChoiceLabel>{option.label}</ChoiceLabel>
            </StyledStandardPressable>
            {index < options.length - 1 && <Spacer size={15} />}
          </React.Fragment>
        );
      })}
    </ChoiceContainer>
  );
};

const ChoiceContainer = styled.View`
  flex: 1;
  ${Layout.flexCenter};
  width: 100%;
`;

const StyledStandardPressable = styled(StandardPressable)`
  padding: 15px;
  width: 100%;
  ${Outlines.inputBorder}
  border-color: ${props => (props.isSelected ? Colours.secondary : Colours.neutral.grey3)};
  background-color: ${props =>
    props.isSelected
      ? theme('theme', {
          light: lighten(Colours.secondary, 0.9),
          dark: darken(Colours.secondary, 0.9),
        })
      : Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
  border-width: ${props => (props.isSelected ? 1.5 : 0.5)}px;
  elevation: ${props => (props.isSelected ? 4 : 0)};
`;

const ChoiceLabel = styled.Text`
  ${Typography.body};
  color: ${Theme.bodyTextColour};
`;

export default StandardRadioInput;
