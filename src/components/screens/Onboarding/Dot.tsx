import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';

const { width } = Dimensions.get('window');

const Dot = ({
  index,
  activeIndex,
  translateX,
}: {
  index: number;
  translateX: SharedValue<number>;
  activeIndex: SharedValue<number>;
}) => {
  const { colors } = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const active = index === activeIndex.value;
    const widthAnimation = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [15, 20, 15],
      Extrapolation.CLAMP,
    );
    return {
      backgroundColor: withTiming(active ? colors.primary : colors.border, {
        duration: 100,
      }),
      width: widthAnimation,
    };
  });

  return <Animated.View style={[style.dot, animatedDotStyle]} />;
};

const style = StyleSheet.create({
  dot: {
    width: 15,
    height: 15,
    borderRadius: 9,
  },
});

export { Dot };
