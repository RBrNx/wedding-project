import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const FormWizardV2 = ({ steps = [], renderStep = () => null, renderCount = 3, animIndex }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const indexOutOfRange = Math.abs(index - animIndex.value > renderCount);
        if (indexOutOfRange || !step) return null;

        return renderStep({ step, index });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width,
  },
});

export default FormWizardV2;
