// Controls scroll distance for BottomSheet components
const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 78.33333587646484; // Navigation Header height reported by React Navigation
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const BottomSheet = {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
};

export { BottomSheet };
