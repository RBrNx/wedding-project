import { Colours } from 'library/styles';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    borderWidth: 1.5,
    borderColor: Colours.neutral.grey3,
    textAlign: 'center',
    borderRadius: 10,
    color: Colours.neutral.white,
  },
  focusCell: {
    borderColor: Colours.secondary,
  },
});

const CELL_COUNT = 6;

const StandardCodeInput = ({ value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      keyboardType='number-pad'
      textContentType='oneTimeCode'
      renderCell={({ index, symbol, isFocused }) => (
        <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

export default StandardCodeInput;
