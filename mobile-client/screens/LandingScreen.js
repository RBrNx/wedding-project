import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingIllustration from '../components/SVG/Landing';
import Spacer from '../library/components/Spacer';
import StandardButton from '../library/components/StandardButton';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LandingIllustration size='100%' style={styles.heroImage} />
      <Spacer size={50} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome to the Watson Wedding.</Text>
        <Spacer size={15} />
        <Text style={styles.subHeading}>
          Get started by scanning the QR Code on your invitation, or sign in to your existing account.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <StandardButton
          text='Scan Invitation'
          raised
          icon={() => <MaterialCommunityIcons name='qrcode-scan' size={22} color='white' style={styles.icon} />}
          onPress={() => navigation.navigate('Scanner')}
        />
        <View style={styles.separator} />
        <StandardButton text='I already have an account' raised onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  heroImage: {
    flex: 1,
    marginTop: 50,
  },
  headingContainer: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Muli_700Bold',
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: '5%',
    fontFamily: 'Muli_400Regular',
  },
  buttonContainer: {
    paddingBottom: 25,
  },
  icon: {
    marginRight: 25,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default LandingScreen;
