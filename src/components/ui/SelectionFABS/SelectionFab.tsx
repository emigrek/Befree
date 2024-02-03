import React, { FC, useCallback, useState } from 'react';
import { FAB } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { SelectionFab as SelectionFabType } from './useSelectionFabs';

import { useGlobalStore } from '@/store';

const AnimatedFAB = Animated.createAnimatedComponent(FAB);
const BASE_BOTTOM = 100;
const MARGIN_BETWEEN = 7;

interface SelectionFabProps {
  selectionFab: SelectionFabType;
  totalSelectionFabs: number;
}

const SelectionFab: FC<SelectionFabProps> = ({
  selectionFab,
  totalSelectionFabs,
}) => {
  const { icon, id, onPress, color, size, backgroundColor } = selectionFab;
  const selected = useGlobalStore(state => state.selected);
  const [loading, setLoading] = useState(false);

  const onPressHandler = useCallback(async () => {
    setLoading(true);
    await onPress();
    setLoading(false);
  }, [onPress]);

  const style = useAnimatedStyle(() => {
    const isSelected = selected.length > 0;
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
  }, [selected]);

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
