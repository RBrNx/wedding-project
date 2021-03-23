import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { constantStyles } from '../../styles/theming';
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
  const { colors } = useTheme();
  const { animatedExpansionStyle, animatedIconStyle, animatedMessageStyle, isExpanded } = useAnimatedActionButton({
    size,
    expandToFullSize,
    maxExpansionWidth,
    animationDuration,
  });

  return (
    <View style={styles.fullscreenContainer} pointerEvents='box-none'>
      <AnimatedPressable
        style={[
          styles.expansion,
          {
            height: size,
            borderRadius: size / 2,
            backgroundColor: isPressed ? colors.buttonPressed : colors.button,
          },
          animatedExpansionStyle,
          expansionStyle,
        ]}
        onPress={isExpanded ? onFullSizePress : onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Animated.Text style={[styles.label, animatedMessageStyle, messageStyle]}>{label}</Animated.Text>
        <Animated.View style={[animatedIconStyle, iconStyle]}>{!isExpanded && icon && icon()}</Animated.View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  expansion: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...constantStyles.cardShadow,
  },
  label: {
    color: '#fff',
    textAlign: 'center',
    marginRight: 0,
    marginLeft: 0,
    fontSize: 16,
  },
});

export default StandardActionButton;
