import React, { FC, useCallback, useState } from 'react';
import { FAB } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { SelectionFabType } from './types';

const AnimatedFAB = Animated.createAnimatedComponent(FAB);
const BASE_BOTTOM = 95;
const MARGIN_BETWEEN = 7;

interface SelectionFabProps {
  selectionFab: SelectionFabType;
  totalSelectionFabs: number;
  totalSelected: number;
}

const SelectionFab: FC<SelectionFabProps> = ({
  selectionFab,
  totalSelectionFabs,
  totalSelected,
}) => {
  const { icon, id, onPress, color, size, backgroundColor } = selectionFab;
  const [loading, setLoading] = useState(false);

  const onPressHandler = useCallback(async () => {
    setLoading(true);
    await onPress();
    setLoading(false);
  }, [onPress]);

  const style = useAnimatedStyle(() => {
    const isSelected = totalSelected > 0;
    const inverseIndex = totalSelectionFabs - id - 1;

    return {
      position: 'absolute',
      right: 30,
      bottom: withTiming(
        isSelected
          ? BASE_BOTTOM + inverseIndex * (size ?? 50 + MARGIN_BETWEEN)
          : 30,
        {
          duration: 200 * id + 400,
        },
      ),
      backgroundColor,
      opacity: withTiming(isSelected ? 1 : 0),
    };
  }, [totalSelected]);

  return (
    <AnimatedFAB
      loading={loading}
      icon={icon}
      style={style}
      customSize={size ?? 50}
      onPress={onPressHandler}
      color={color}
      mode={'flat'}
    />
  );
};

export { SelectionFab };
