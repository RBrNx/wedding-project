import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InProgressIllustration from '../components/SVG/InProgress';
import Spacer from '../library/components/Spacer';

const WorkInProgressScreen = () => {
  return (
    <View style={styles.container}>
      <InProgressIllustration size='100%' style={styles.heroImage} />
      <Spacer size={50} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Sorry, we haven&apos;t finished this yet.</Text>
        <Spacer size={15} />
        <Text style={styles.subHeading}>Please check back here in the future for some awesome features!</Text>
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
    fontSize: 32,
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

export default WorkInProgressScreen;
