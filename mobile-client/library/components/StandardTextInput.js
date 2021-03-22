import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, View, TextInput } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedInputBorder from '../../components/AnimatedInputBorder';
import TextDimensions from '../../components/TextDimensions';

const StandardTextInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  maxLength,
  containerStyle,
  inputStyle,
  themeColourOverride,
  borderColourFocused,
  multiline,
}) => {
  const textInput = useRef(null);
  const focusAnimation = useSharedValue(value ? 1 : 0);
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState(0);
  const { colors } = useTheme();

  const onFocus = () => {
    focusAnimation.value = withTiming(1, { duration: 150 });
  };

  const onBlur = () => {
    if (value) return;

    focusAnimation.value = withTiming(0, { duration: 150 });
  };

  const animatedStyles = useAnimatedStyle(() => {
    const top = interpolate(
      focusAnimation.value,
      [0, 1],
      [styles.regularLabel.top, styles.smallLabel.top],
      Extrapolate.CLAMP,
    );
    const fontSize = interpolate(
      focusAnimation.value,
      [0, 1],
      [styles.regularLabel.fontSize, styles.smallLabel.fontSize],
      Extrapolate.CLAMP,
    );
    const color = interpolateColor(focusAnimation.value, [0, 1], ['#aaa', themeColourOverride || colors.focusedText]);

    return {
      top,
      fontSize,
      color,
    };
  });

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {!!inputHeight && !!inputWidth && (
        <AnimatedInputBorder
          inputHeight={inputHeight}
          inputWidth={inputWidth}
          borderColour={themeColourOverride || borderColourFocused}
          gapStartX={styles.input.paddingLeft}
          gapWidth={labelWidth}
          focusAnimationProgress={focusAnimation}
        />
      )}
      <TextInput
        ref={textInput}
        onLayout={event => {
          const { height, width } = event.nativeEvent.layout;
          setInputHeight(Math.round(height));
          setInputWidth(Math.round(width));
        }}
        style={[
          styles.input,
          { color: themeColourOverride || colors.focusedText, minHeight: multiline ? 200 : 0 },
          inputStyle,
        ]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      <Animated.Text style={[styles.regularLabel, animatedStyles]} onPress={() => textInput.current.focus()}>
        {label}
      </Animated.Text>
      <TextDimensions
        text={label}
        style={styles.smallLabel}
        onDimensions={dimensions => {
          if (labelWidth) return;

          setLabelWidth(dimensions.width);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
  },
  input: {
    padding: 15,
    paddingLeft: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Muli_400Regular',
  },
  regularLabel: {
    position: 'absolute',
    left: 30,
    top: Platform.select({
      ios: 16,
      android: 17,
    }),
    fontSize: 16,
    color: '#aaa',
    fontFamily: 'Muli_400Regular',
  },
  smallLabel: {
    position: 'absolute',
    left: 30,
    top: Platform.select({
      ios: -5,
      android: -10,
    }),
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Muli_400Regular',
  },
});

export default StandardTextInput;
