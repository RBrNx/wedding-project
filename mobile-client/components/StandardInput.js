import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AnimatedInputBorder from './AnimatedInputBorder';

const { width: windowWidth } = Dimensions.get('window');

const StandardInput = ({ label, value, placeholder, onChangeText }) => {
  const textInput = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [focusAnimation] = useState(new Animated.Value(0));
  const [inputHeight, setInputHeight] = useState(0);
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
      outputRange: [20, -5],
    }),
    fontSize: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#fff'],
    }),
  };

  return (
    <View style={{ position: 'relative' }}>
      {!!inputHeight && !!windowWidth && (
        <AnimatedInputBorder
          height={inputHeight}
          width={windowWidth}
          borderRadius={15}
          label={label}
          labelStyle={[styles.label, { fontSize: 14 }]}
          animate={shouldAnimateLabel}
        />
      )}
      <TextInput
        ref={textInput}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setInputHeight(Math.round(height));
        }}
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Animated.Text style={[styles.label, animatedStyles]} onPress={() => textInput.current.focus()}>
        {label}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    padding: 20,
    paddingLeft: 40,
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
    paddingHorizontal: 10,
    top: 20,
    fontSize: 20,
    color: '#aaa',
  },
});

export default StandardInput;
