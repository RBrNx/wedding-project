import React from 'react';
import styled from 'styled-components/native';
import { Colours, Layout, Outlines, Theme, Typography } from '../../styles';
import { lighten } from '../helpers/colours';
import Spacer from './Spacer';
import StandardPressable from './StandardPressable';

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
  border-color: ${props => (props.isSelected ? Colours.secondary : Colours.neutral.grey)};
  background-color: ${props => (props.isSelected ? lighten(Colours.secondary, 0.9) : Colours.neutral.offWhite)};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
  border-width: ${props => (props.isSelected ? 1.5 : 0.5)}px;
  elevation: ${props => (props.isSelected ? 4 : 0)};
`;

const ChoiceLabel = styled.Text`
  ${Typography.regular};
  color: ${Theme.bodyTextColour};
`;

export default StandardRadioInput;
