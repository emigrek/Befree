import { useMemo } from 'react';

import { useTriggerNotifications } from '../notifications/useTriggerNotifications';

import { useGlobalStore } from '@/store';

export const useAchievementsNotifications = () => {
  const { triggerNotifications } = useTriggerNotifications();
  const addictions = useGlobalStore(state => state.addictions);

  return useMemo(
    () =>
      addictions.map(addiction => {
        const notifications = triggerNotifications.filter(
          ({ notification }) => {
            const data = notification.data;
            return data?.addictionId === addiction.id;
          },
        );

        return {
          addiction,
          notifications,
        };
      }),
    [addictions, triggerNotifications],
  );
};
