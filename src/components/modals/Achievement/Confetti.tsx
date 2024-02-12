import confetti from '@assets/confetti.json';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const Confetti = () => {
  return (
    <LottieView
      source={confetti}
      style={{
        position: 'absolute',
        width,
        height,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      resizeMode="cover"
      loop={false}
      autoPlay
    />
  );
};

export { Confetti };
