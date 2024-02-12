import confetti from '@assets/confetti.json';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const Confetti = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play();
    }, 1000);
  }, []);

  return (
    <LottieView
      ref={animationRef}
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
    />
  );
};

export { Confetti };
