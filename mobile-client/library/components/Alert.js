import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import StatusLine from '../../components/StatusLine';
import { constantStyles } from '../../styles/theming';
import { AlertType } from '../enums';
import Spacer from './Spacer';

const alertTypeMap = {
  [AlertType.SUCCESS]: { title: 'Yay! Everything worked!', colour: '#21a67a' },
  [AlertType.WARNING]: { title: 'Uh oh, something went wrong', colour: '#f0a92e' },
};

const Alert = ({
  title,
  message,
  type,
  position,
  dismissAlert,
  isVisible,
  isStatusBarTranslucent = true,
  breathingSpace = 15,
}) => {
  const alertEntrance = useSharedValue(0);
  const [alertHeight, setAlertHeight] = useState(0);
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const alertTitle = title || alertTypeMap[type]?.title;
  const alertColour = alertTypeMap[type]?.colour;
  const statusBarPadding = isStatusBarTranslucent ? StatusBar.currentHeight : 0;
  const displayHeight = height + statusBarPadding;

  useEffect(() => {
    if (isVisible) alertEntrance.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
    else alertEntrance.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.exp) });
  }, [isVisible]);

  const animatedAlertStyle = useAnimatedStyle(() => {
    const startY = position === 'bottom' ? displayHeight : 0 - alertHeight;
    const endY =
      position === 'bottom' ? displayHeight - alertHeight - breathingSpace : breathingSpace + statusBarPadding;

    const translateY = interpolate(alertEntrance.value, [0, 1], [startY, endY], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[styles.alert, animatedAlertStyle]}
      onLayout={event => {
        const { height: vHeight } = event.nativeEvent.layout;
        setAlertHeight(vHeight);
      }}
    >
      <StatusLine colour={alertColour} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.bodyText }]}>{alertTitle}</Text>
        <Spacer size={4} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <Pressable onPress={dismissAlert} style={styles.iconContainer}>
        <Ionicons name='close-outline' size={24} color='#e0e0e0' style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    marginHorizontal: '5%',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#fff',
    ...constantStyles.inputShadow,
  },
  textContainer: {
    marginVertical: 5,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 14,
  },
  message: {
    color: '#93959a',
    fontSize: 14,
  },
  iconContainer: {
    height: '100%',
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    paddingRight: 10,
  },
});

export default Alert;
