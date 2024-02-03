import { useMemo } from 'react';

import { removeAllNotifications } from '@/hooks/goal/achievementsNotifications';
import UserData from '@/services/data/userData';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

interface SelectionFab {
  id: number;
  icon: string;
  onPress: () => Promise<void>;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const useSelectionFabs = () => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const { selected, setSelected, removeAddictionFromNotificationsBlacklist } =
    useGlobalStore(state => ({
      selected: state.selected,
      setSelected: state.setSelected,
      removeAddictionFromNotificationsBlacklist: state.removeBlacklist,
    }));

  return useMemo<SelectionFab[]>(
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
          const { addictions } = new UserData(user.uid);

          const deletionPromise = selected.map(async id => {
            removeAllNotifications({
              addictionId: id,
            });
            removeAddictionFromNotificationsBlacklist(id);
            return addictions.delete(id);
          });

          setSelected([]);

          await Promise.all(deletionPromise);
        },
      },
      {
        id: 2,
        icon: 'restart',
        color: colors.onSecondaryContainer,
        backgroundColor: colors.secondaryContainer,
        onPress: async () => {
          if (!user) return;
          const { relapses } = new UserData(user.uid);

          const relapsePromise = selected.map(async id => {
            return relapses.create({
              addictionId: id,
              relapseAt: new Date(),
            });
          });

          setSelected([]);

          await Promise.all(relapsePromise);
        },
      },
    ],
    [
      colors,
      setSelected,
      selected,
      user,
      removeAddictionFromNotificationsBlacklist,
    ],
  );
};

export { SelectionFab, useSelectionFabs };
