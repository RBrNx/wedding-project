import React from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../assets/animations/loading.json';

const LoadingIndicator = () => <LottieView source={LoadingAnimation} autoPlay loop />;

export default LoadingIndicator;
