/* eslint-disable no-param-reassign */
import { useSharedValue } from 'react-native-reanimated';

const useVector = (x1 = 0, y1) => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);

  const set = ({ x: _x, y: _y }) => {
    'worklet';

    if (_x) x.value = _x?.value ?? _x;
    if (_y) y.value = _y?.value ?? _y;
  };

  const subtract = ({ x: _x, y: _y }) => {
    'worklet';

    if (_x) x.value -= _x?.value ?? _x;
    if (_y) y.value -= _y?.value ?? _y;
  };

  return { x, y, set, subtract };
};

export default useVector;
