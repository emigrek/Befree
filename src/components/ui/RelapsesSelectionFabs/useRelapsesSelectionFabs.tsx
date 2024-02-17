import { useMemo } from 'react';

import { SelectionFabType } from '@/components/ui/SelectionFab';
import { UserDataManager } from '@/services/managers/firebase';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';
import { useAuthStore, useRelapsesSelectionStore } from '@/store';
import { useTheme } from '@/theme';

interface UseRelapsesSelectionFabsProps {
  addiction: Addiction;
}

const useRelapsesSelectionFabs = ({
  addiction,
}: UseRelapsesSelectionFabsProps) => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const { selected, setSelected } = useRelapsesSelectionStore(state => ({
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

          const { relapses, addictions } = new UserDataManager(user.uid);
          const deletionPromise = selected.map(relapse =>
            relapses.delete(relapse.id),
          );

          await Promise.all(deletionPromise);

          const isBlacklisted =
            await NotificationsBlacklistManager.getInstance().has(addiction.id);
          if (!isBlacklisted) {
            const newAddiction = await addictions.get(addiction.id);
            if (newAddiction)
              await new AchievementNotificationsManager(
                newAddiction,
              ).reschedule();
          }

          setSelected([]);
        },
      },
    ],
    [colors, setSelected, selected, user, addiction],
  );
};

export { useRelapsesSelectionFabs };
