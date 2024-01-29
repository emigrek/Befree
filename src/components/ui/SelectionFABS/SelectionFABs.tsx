import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { FC, useCallback, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { FAB } from '@/components/ui/FAB';
import { removeAllNotifications } from '@/hooks/goal/achievementsNotifications';
import UserData from '@/services/data/userData';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const AnimatedFAB = Animated.createAnimatedComponent(FAB);

interface SelectionFABsProps {
  user: FirebaseAuthTypes.User;
  addictions: Addiction[];
}

const SelectionFABs: FC<SelectionFABsProps> = ({ user, addictions }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    selected,
    setSelected,
    storeRemove,
    removeBlacklist: removeAddictionFromNotificationsBlacklist,
  } = useGlobalStore(state => ({
    selected: state.selected,
    setSelected: state.setSelected,
    storeRemove: state.removeAddiction,
    removeBlacklist: state.removeBlacklist,
  }));

  const closeStyle = useAnimatedStyle(() => {
    return {
      right: 30,
      bottom: withTiming(selected.length > 0 ? 150 : 30),
      backgroundColor: colors.secondaryContainer,
      opacity: withTiming(selected.length > 0 ? 1 : 0),
    };
  }, [selected]);

  const deleteStyle = useAnimatedStyle(() => {
    return {
      right: 30,
      bottom: withTiming(selected.length > 0 ? 95 : 30),
      backgroundColor: colors.secondaryContainer,
      opacity: withTiming(selected.length > 0 ? 1 : 0),
    };
  }, [selected]);

  const handleSelectedDelete = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const deletionPromise = selected.map(async id => {
      storeRemove(id);
      removeAllNotifications({
        addictionId: id,
      });
      removeAddictionFromNotificationsBlacklist(id);
      UserData.getInstance(user.uid).addictions.delete(id);
    });

    await Promise.all(deletionPromise).then(() => {
      setLoading(false);
      setSelected([]);
    });
  }, [
    user,
    selected,
    storeRemove,
    removeAddictionFromNotificationsBlacklist,
    setSelected,
  ]);

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
