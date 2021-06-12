import { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const useMemoryUploader = () => {
  const sheetPosition = useSharedValue(0);
  const opacityBounce = useSharedValue(0);
  const uploadButtonVisible = useSharedValue(0);
  const uploadButtonVisibility = useDerivedValue(() => {
    if (uploadButtonVisible.value === 1) return sheetPosition.value;
    return uploadButtonVisible.value;
  });
  const folderSelectorVisible = useSharedValue(1);
  const folderSelectorVisibilty = useDerivedValue(() => {
    if (folderSelectorVisible.value === 1) return sheetPosition.value;
    return folderSelectorVisible.value;
  });

  const folderSelectorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(folderSelectorVisibilty.value, [0, 1], [50, 0], Extrapolate.CLAMP) }],
  }));

  const flatlistAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacityBounce.value, [0, 0.5, 1], [1, 0, 1], Extrapolate.CLAMP),
  }));

  const uploadButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(uploadButtonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ scale: interpolate(uploadButtonVisibility.value, [0, 1], [0, 1], Extrapolate.CLAMP) }],
  }));

  return {
    sheetPosition,
    opacityBounce,
    uploadButtonVisible,
    folderSelectorVisible,
    folderSelectorAnimatedStyle,
    flatlistAnimatedStyle,
    uploadButtonAnimatedStyle,
  };
};

export default useMemoryUploader;
