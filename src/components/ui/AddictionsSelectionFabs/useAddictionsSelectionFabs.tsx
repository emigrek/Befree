import { useMemo } from 'react';

import { SelectionFabType } from '@/components/ui/SelectionFab';
import {
  AddictionManager,
  UserDataManager,
} from '@/services/managers/firebase';
import { NotificationsBlacklistManager } from '@/services/managers/local';
import { useAddictionsSelectionStore, useAuthStore } from '@/store';
import { useTheme } from '@/theme';

const useAddictionsSelectionFabs = () => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
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
            addiction.achievements.notifications.cancelAll();
            NotificationsBlacklistManager.getInstance().remove(addiction.id);
            addictions.delete(addiction.id);
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
          const { relapses, addictions } = new UserDataManager(user.uid);

          const relapsePromise = selected.map(async addiction => {
            await relapses.create({
              addictionId: addiction.id,
              note: '',
              relapseAt: new Date(),
            });

            const isBlacklisted =
              await NotificationsBlacklistManager.getInstance().has(
                addiction.id,
              );
            if (!isBlacklisted) {
              const newAddiction = await addictions.get(addiction.id);
              if (newAddiction)
                await newAddiction.achievements.notifications.reschedule();
            }
          });

          await Promise.all(relapsePromise);
          setSelected([]);
        },
      },
    ],
    [colors, user, selected, setSelected],
  );
};

export { useAddictionsSelectionFabs };
