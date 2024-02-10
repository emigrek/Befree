import { useMemo } from 'react';

import { SelectionFabType } from '@/components/ui/SelectionFab';
import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import AddictionManager from '@/services/data/managers/addiction';
import RelapseManager from '@/services/data/managers/relapse';
import {
  useAddictionsSelectionStore,
  useAuthStore,
  useGlobalStore,
} from '@/store';
import { useTheme } from '@/theme';

const useAddictionsSelectionFabs = () => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const {
    removeAddictionFromNotificationsBlacklist,
    hasNotificationsBlacklisted,
  } = useGlobalStore(state => ({
    removeAddictionFromNotificationsBlacklist: state.removeBlacklist,
    hasNotificationsBlacklisted: state.isBlacklisted,
  }));
  const { selected, setSelected } = useAddictionsSelectionStore(state => ({
    selected: state.selected,
    setSelected: state.set,
  }));

  return useMemo<SelectionFabType[]>(
    () => [
      {
        id: 0,
        icon: 'close',
        color: colors.onSecondaryContainer,
        backgroundColor: 'transparent',
        onPress: async () => {
          setSelected([]);
        },
      },
      {
        id: 1,
        icon: 'trash-can',
        color: colors.error,
        backgroundColor: colors.errorContainer,
        onPress: async () => {
          if (!user) return;

          const addictions = new AddictionManager(user.uid);
          const deletionPromise = selected.map(async addiction => {
            removeAllNotifications({
              addictionId: addiction.id,
            });
            removeAddictionFromNotificationsBlacklist(addiction.id);
            return addictions.delete(addiction.id);
          });

          await Promise.all(deletionPromise);
          setSelected([]);
        },
      },
      {
        id: 2,
        icon: 'restart',
        color: colors.onSecondaryContainer,
        backgroundColor: colors.secondaryContainer,
        onPress: async () => {
          if (!user) return;

          const relapses = new RelapseManager(user.uid);
          const relapsePromise = selected.map(async addiction => {
            await relapses.create({
              addictionId: addiction.id,
              note: '',
              relapseAt: new Date(),
            });

            if (!hasNotificationsBlacklisted(addiction.id)) {
              removeAllNotifications({ addictionId: addiction.id });
              addAllNotifications({ addiction });
            }
          });

          await Promise.all(relapsePromise);
          setSelected([]);
        },
      },
    ],
    [
      colors,
      removeAddictionFromNotificationsBlacklist,
      user,
      selected,
      setSelected,
      hasNotificationsBlacklisted,
    ],
  );
};

export { useAddictionsSelectionFabs };
