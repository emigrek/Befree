import { User } from 'firebase/auth';
import React, { FC, useCallback, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { FAB } from '@/components/ui/FAB';
import { removeAddiction } from '@/services/queries';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const AnimatedFAB = Animated.createAnimatedComponent(FAB);

interface SelectionFABsProps {
  user: User;
  addictions: Addiction[];
}

const SelectionFABs: FC<SelectionFABsProps> = ({ user, addictions }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const { selected, setSelected } = useGlobalStore(state => ({
    selected: state.selected,
    setSelected: state.setSelected,
    storeRemove: state.remove,
    storeAdd: state.add,
  }));

  const closeStyle = useAnimatedStyle(() => {
    return {
      right: 30,
      bottom: withTiming(selected.length > 0 ? 160 : 30),
      backgroundColor: colors.secondaryContainer,
    };
  }, [selected]);

  const deleteStyle = useAnimatedStyle(() => {
    return {
      right: 30,
      bottom: withTiming(selected.length > 0 ? 100 : 30),
      backgroundColor: colors.secondaryContainer,
    };
  }, [selected]);

  const handleSelectedDelete = useCallback(() => {
    if (!user) return;
    setLoading(true);

    const deletionPromise = selected.map(id => {
      const addiction = addictions.find(addiction => addiction.id === id);
      if (!addiction) return Promise.resolve();
      return removeAddiction({ user, id });
    });

    Promise.all(deletionPromise).then(() => {
      setSelected([]);
      setLoading(false);
    });
  }, [addictions, user, selected, setSelected]);

  const handleSelectionCancel = useCallback(() => {
    setSelected([]);
  }, [setSelected]);

  return (
    <>
      <AnimatedFAB
        icon="close"
        customSize={50}
        style={closeStyle}
        onPress={handleSelectionCancel}
        color={colors.onSecondaryContainer}
        mode={'flat'}
      />
      <AnimatedFAB
        loading={loading}
        icon="trash-can"
        customSize={50}
        style={deleteStyle}
        onPress={handleSelectedDelete}
        color={colors.onSecondaryContainer}
        mode={'flat'}
      />
    </>
  );
};

export { SelectionFABs };
