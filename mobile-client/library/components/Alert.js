import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import StatusLine from '../../components/StatusLine';
import { constantStyles } from '../../styles/theming';
import Spacer from './Spacer';

const Alert = ({ title, message, dismissAlert }) => {
  const alertTitle = title;
  const alertMessage = message;
  const { colors } = useTheme();

  return (
    <View style={styles.alert}>
      <StatusLine colour='#f0a92e' />
      <View style={styles.textContainer}>
        <Text style={{ color: colors.bodyText, fontSize: 14 }}>{alertTitle}</Text>
        <Spacer size={4} />
        <Text style={styles.message}>{alertMessage}</Text>
      </View>
      <Pressable onPress={dismissAlert} style={styles.iconContainer}>
        <Ionicons name='close-outline' size={24} color='#e0e0e0' style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '90%',
    marginLeft: '5%',
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
