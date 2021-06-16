import { useEffect } from 'react';
import {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useMemoryUploader = ({ selectedAssets }) => {
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

  const resetAnimatedValues = () => {
    opacityBounce.value = 0;
    uploadButtonVisible.value = 0;
    folderSelectorVisible.value = 1;
  };

  useEffect(() => {
    if (selectedAssets.length && !uploadButtonVisible.value) {
      uploadButtonVisible.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
      folderSelectorVisible.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
    } else if (!selectedAssets.length) {
      uploadButtonVisible.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
      folderSelectorVisible.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
    }
  }, [folderSelectorVisible.value, selectedAssets.length, uploadButtonVisible.value]);

  return {
    sheetPosition,
    opacityBounce,
    uploadButtonVisible,
    folderSelectorVisible,
    folderSelectorAnimatedStyle,
    flatlistAnimatedStyle,
    uploadButtonAnimatedStyle,
    resetAnimatedValues,
  };
};

export default useMemoryUploader;
