import React, { useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Typography } from '../../styles';
import { darken } from '../helpers/colours';
import useAnimatedActionButton from '../hooks/useAnimatedActionButton';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StandardActionButton = ({
  size = 56,
  icon,
  label,
  onPress,
  onFullSizePress,
  expandToFullSize,
  expansionStyle = { right: 16, bottom: 16 },
  iconStyle,
  messageStyle,
  maxExpansionWidth = width,
  animationDuration = 300,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { animatedExpansionStyle, animatedIconStyle, animatedMessageStyle, isExpanded } = useAnimatedActionButton({
    size,
    expandToFullSize,
    maxExpansionWidth,
    animationDuration,
  });

  return (
    <FullscreenContainer pointerEvents='box-none'>
      <StyledPressable
        style={[
          { backgroundColor: isPressed ? darken(Colours.secondary, 0.2) : Colours.secondary },
          animatedExpansionStyle,
          expansionStyle,
        ]}
        size={size}
        onPress={isExpanded ? onFullSizePress : onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <ExpandedLabel style={[animatedMessageStyle, messageStyle]}>{label}</ExpandedLabel>
        <Animated.View style={[animatedIconStyle, iconStyle]}>{!isExpanded && icon && icon()}</Animated.View>
      </StyledPressable>
    </FullscreenContainer>
  );
};

const FullscreenContainer = styled.View`
  ${Layout.absoluteFill};
  z-index: 99;
`;

const StyledPressable = styled(AnimatedPressable)`
  position: absolute;
  flex-direction: row;
  ${Layout.flexCenter};
  ${Outlines.boxShadow};
  overflow: hidden;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
`;

const ExpandedLabel = styled(Animated.Text)`
  color: ${Colours.neutral.white};
  text-align: center;
  margin-right: 0;
  margin-left: 0;
  ${Typography.regular}
`;

export default StandardActionButton;
