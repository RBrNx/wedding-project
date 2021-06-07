import React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { Colours, Layout, Outlines, Typography } from 'library/styles';
import { darken } from 'library/utils/colours';
import { useAnimatedActionButton } from 'library/hooks';
import StandardPressable from './StandardPressable';
import withAnimated from './withAnimated';

const { width } = Dimensions.get('window');
const AnimatedPressable = withAnimated(StandardPressable);

const StandardActionButton = ({
  size = 56,
  icon,
  label,
  onPress,
  onFullSizePress,
  expandToFullSize,
  position = { right: 16, bottom: 16 },
  style,
  iconStyle,
  messageStyle,
  containerStyle,
  maxExpansionWidth = width,
  animationDuration = 300,
}) => {
  const { animatedExpansionStyle, animatedIconStyle, animatedMessageStyle, isExpanded } = useAnimatedActionButton({
    size,
    expandToFullSize,
    maxExpansionWidth,
    animationDuration,
  });

  return (
    <FullscreenContainer pointerEvents='box-none' style={containerStyle}>
      <StyledPressable
        style={[animatedExpansionStyle, style]}
        size={size}
        position={position}
        onPress={isExpanded ? onFullSizePress : onPress}
      >
        <ExpandedLabel style={[animatedMessageStyle, messageStyle]}>{label}</ExpandedLabel>
        <Animated.View style={[animatedIconStyle, iconStyle]}>{icon}</Animated.View>
      </StyledPressable>
    </FullscreenContainer>
  );
};

const FullscreenContainer = styled.View`
  ${Layout.absoluteFill};
`;

const StyledPressable = styled(AnimatedPressable).attrs(() => ({
  pressedStyle: {
    backgroundColor: darken(Colours.secondary, 0.2),
  },
}))`
  position: absolute;
  flex-direction: row;
  ${Layout.flexCenter};
  ${Outlines.boxShadow};
  background-color: ${Colours.secondary};
  overflow: hidden;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  ${props => props.position};
`;

const ExpandedLabel = styled(Animated.Text)`
  color: ${Colours.neutral.white};
  text-align: center;
  margin-right: 0;
  margin-left: 0;
  ${Typography.body}
`;

export default StandardActionButton;
