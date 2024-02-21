import center from '@assets/confettiCenter.json';
import toTop from '@assets/confettiToTop.json';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import React, { forwardRef } from 'react';

export enum ConfettiVariant {
  Center = 'center',
  ToTop = 'toTop',
}

interface ConfettiProps extends Omit<AnimatedLottieViewProps, 'source'> {
  variant?: ConfettiVariant;
}

const confetties = {
  [ConfettiVariant.Center]: center,
  [ConfettiVariant.ToTop]: toTop,
};

const Confetti = forwardRef<LottieView, ConfettiProps>(
  function Confetti(props, ref) {
    return (
      <LottieView
        ref={ref}
        source={confetties[props.variant || ConfettiVariant.Center]}
        {...props}
      />
    );
  },
);

export { Confetti };
