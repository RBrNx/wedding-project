import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AnimatedInputBorder from '../../components/AnimatedInputBorder';

const { width: windowWidth } = Dimensions.get('window');

const StandardInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  containerStyle,
  inputStyle,
  borderColour,
}) => {
  const textInput = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [focusAnimation] = useState(new Animated.Value(0));
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState(0);
  const shouldAnimateLabel = isFocused || value;

  useEffect(() => {
    Animated.timing(focusAnimation, {
      toValue: shouldAnimateLabel ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusAnimation, shouldAnimateLabel]);

  const animatedStyles = {
    top: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.label.top, styles.smallLabel.top],
    }),
    fontSize: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.label.fontSize, styles.smallLabel.fontSize],
    }),
    color: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.label.color, styles.smallLabel.color],
    }),
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {!!inputHeight && !!windowWidth && (
        <AnimatedInputBorder
          height={inputHeight}
          width={inputWidth}
          borderRadius={5}
          borderColour={borderColour}
          labelXPos={styles.input.paddingLeft}
          gapWidth={labelWidth}
          animate={shouldAnimateLabel}
        />
      )}
      <TextInput
        ref={textInput}
        onLayout={event => {
          const { height, width } = event.nativeEvent.layout;
          setInputHeight(Math.round(height));
          setInputWidth(Math.round(width));
        }}
        style={[styles.input, inputStyle]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      <Animated.Text style={[styles.label, animatedStyles]} onPress={() => textInput.current.focus()}>
        {label}
      </Animated.Text>
      <Text
        style={[styles.smallLabel, { opacity: 0 }]}
        onLayout={event => {
          if (labelWidth) return;

          const { width: textWidth } = event.nativeEvent.layout;
          setLabelWidth(textWidth);
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
  },
  input: {
    borderRadius: 5,
    padding: 18,
    paddingLeft: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18,
    color: '#fff',
  },
  label: {
    position: 'absolute',
    left: 30,
    top: Platform.select({
      ios: 16,
      android: 18,
    }),
    fontSize: 20,
    color: '#aaa',
  },
  smallLabel: {
    position: 'absolute',
    left: 30,
    top: Platform.select({
      ios: -5,
      android: -7,
    }),
    fontSize: 14,
    color: '#fff',
  },
});

export default StandardInput;
