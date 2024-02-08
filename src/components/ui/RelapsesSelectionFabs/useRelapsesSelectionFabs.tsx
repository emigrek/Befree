import { useMemo } from 'react';

import { SelectionFabType } from '@/components/ui/SelectionFab';
import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import RelapseManager from '@/services/data/managers/relapse';
import {
  useAuthStore,
  useGlobalStore,
  useRelapsesSelectionStore,
} from '@/store';
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
    setSelected: state.setSelected,
  }));
  const { hasNotificationsBlacklisted } = useGlobalStore(state => ({
    hasNotificationsBlacklisted: state.isBlacklisted,
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
          const relapses = new RelapseManager(user.uid);

          const deletionPromise = selected.map(async id => {
            return relapses.delete(id);
          });

          await Promise.all(deletionPromise);
          setSelected([]);

          if (!hasNotificationsBlacklisted(addiction.id)) {
            removeAllNotifications({ addictionId: addiction.id });
            addAllNotifications({ addiction });
          }
        },
      },
    ],
    [
      colors.error,
      colors.errorContainer,
      colors.onSecondaryContainer,
      setSelected,
      selected,
      user,
      addiction,
      hasNotificationsBlacklisted,
    ],
  );
};

export { useRelapsesSelectionFabs };
