import { useMemo } from 'react';

import { SelectionFabType } from '@/components/ui/SelectionFab';
import { removeAllNotifications } from '@/hooks/goal/achievementsNotifications';
import UserData from '@/services/data/userData';
import {
  useAddictionsSelectionStore,
  useAuthStore,
  useGlobalStore,
} from '@/store';
import { useTheme } from '@/theme';

const useAddictionsSelectionFabs = () => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const { removeAddictionFromNotificationsBlacklist } = useGlobalStore(
    state => ({
      removeAddictionFromNotificationsBlacklist: state.removeBlacklist,
    }),
  );
  const { selected, setSelected } = useAddictionsSelectionStore(state => ({
    selected: state.selected,
    setSelected: state.setSelected,
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
          const { addictions } = new UserData(user.uid);

          const deletionPromise = selected.map(async id => {
            removeAllNotifications({
              addictionId: id,
            });
            removeAddictionFromNotificationsBlacklist(id);
            return addictions.delete(id);
          });

          await Promise.all(deletionPromise);
          setSelected([]);
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

export { useAddictionsSelectionFabs };
