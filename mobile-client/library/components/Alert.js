import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import StatusLine from '../../components/StatusLine';
import { constantStyles } from '../../styles/theming';
import { AlertType } from '../enums';
import useAnimatedAlert from '../hooks/useAnimatedAlert';
import Spacer from './Spacer';

const alertTypeMap = {
  [AlertType.SUCCESS]: { title: 'Yay! Everything worked!', colour: '#21a67a' },
  [AlertType.WARNING]: { title: 'Uh oh, something went wrong', colour: '#f0a92e' },
};

const Alert = ({
  title,
  message,
  type,
  position = 'top',
  dismissAlert,
  isVisible,
  isStatusBarTranslucent = true,
  breathingSpace = 15,
}) => {
  const [alertHeight, setAlertHeight] = useState(0);
  const { colors } = useTheme();
  const { animatedAlertStyle } = useAnimatedAlert({
    isVisible,
    isStatusBarTranslucent,
    position,
    alertHeight,
    breathingSpace,
  });
  const alertTitle = title || alertTypeMap[type]?.title;
  const alertColour = alertTypeMap[type]?.colour;

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
