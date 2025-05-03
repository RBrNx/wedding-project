import { Dimensions } from 'react-native';

// Controls scroll distance for BottomSheet components
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0; // Navigation Header height reported by React Navigation
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const BottomSheet = {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
};

const { height } = Dimensions.get('window');
const SubmitRSVP = {
  QUESTION_HEIGHT: height * 0.4,
};

export { BottomSheet, SubmitRSVP };
