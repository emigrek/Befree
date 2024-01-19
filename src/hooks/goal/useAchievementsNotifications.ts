import { useMemo } from 'react';

import { useTriggerNotifications } from '../notifications/useTriggerNotifications';

import { useGlobalStore } from '@/store';

interface UseAchievementsNotificationsProps {
  hidden?: boolean;
}

export const useAchievementsNotifications = ({
  hidden,
}: UseAchievementsNotificationsProps) => {
  const { triggerNotifications } = useTriggerNotifications();
  const addictions = useGlobalStore(state => state.addictions);

  return useMemo(() => {
    return addictions
      .filter(addiction => (hidden ? addiction.hidden : !addiction.hidden))
      .map(addiction => {
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
      });
  }, [addictions, triggerNotifications, hidden]);
};
