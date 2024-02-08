import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { TouchableRipple as PaperTouchableRipple } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const TouchableRipple = forwardRef<
  ElementRef<typeof PaperTouchableRipple>,
  ComponentPropsWithoutRef<typeof PaperTouchableRipple>
>(({ ...props }, ref) => {
  return (
    <Animated.View ref={ref}>
      <PaperTouchableRipple {...props} />
    </Animated.View>
  );
});

const AnimatedTouchableRipple =
  Animated.createAnimatedComponent(TouchableRipple);

export { AnimatedTouchableRipple, TouchableRipple };
