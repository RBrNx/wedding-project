import { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const useBottomSheetActionButton = () => {
  const sheetPosition = useSharedValue(0);
  const buttonVisible = useSharedValue(1);
  const buttonVisibility = useDerivedValue(() => {
    if (buttonVisible.value === 1) return sheetPosition.value;
    return buttonVisible.value;
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(buttonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ scale: interpolate(buttonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  const resetAnimatedValues = () => {
    buttonVisible.value = 0;
  };

  return {
    sheetPosition,
    buttonVisible,
    buttonAnimatedStyle,
    resetAnimatedValues,
  };
};

export default useBottomSheetActionButton;
