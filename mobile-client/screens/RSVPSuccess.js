import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import SuccessAnimation from '../components/SuccessAnimation';
import ConfettiCannon from '../library/components/ConfettiCannon';
import Spacer from '../library/components/Spacer';
import StandardButton from '../library/components/StandardButton';
import usePreventGoingBack from '../library/hooks/usePreventGoingBack';

const RSVPSuccessScreen = ({ route, navigation }) => {
  const fadeIn = useSharedValue(0);
  const { isAttending = false } = route?.params || {};
  usePreventGoingBack();

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <ConfettiCannon initialDelay={750} />
      <SuccessAnimation size={250} />
      <View style={{ flex: 0.5 }}>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>
          Your response has been sent to the happy couple 💌
        </Text>
        <Spacer size={30} />
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>
          {isAttending
            ? 'Conor & Lyndsay are excited to have you share their special day with them!'
            : 'Conor & Lyndsay are sorry to hear that you are unable to attend their special day, you will be missed!'}
        </Text>
      </View>
      <StandardButton text='Continue' raised onPress={() => navigation.navigate('GuestHome')} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  animation: {
    width: '50%',
  },
});

export default RSVPSuccessScreen;
