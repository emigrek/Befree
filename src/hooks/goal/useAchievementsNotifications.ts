import { TriggerNotification } from '@notifee/react-native';
import { useMemo } from 'react';

import { useAddictions } from '../addiction/useAddictions';
import { useTriggerNotifications } from '../notification/useTriggerNotifications';

interface UseAchievementsNotificationsProps {
  hidden?: boolean;
}

export interface AchievementNotifications {
  addiction: Addiction;
  notifications: TriggerNotification[];
}

export const useAchievementsNotifications = ({
  hidden,
}: UseAchievementsNotificationsProps) => {
  const { triggerNotifications } = useTriggerNotifications();
  const { addictions } = useAddictions({ hidden });

  return useMemo(() => {
    return addictions.map(addiction => {
      const notifications = triggerNotifications.filter(({ notification }) => {
        const data = notification.data;
        return data?.addictionId === addiction.id;
      });

      return {
        addiction,
        notifications,
      };
    });
  }, [addictions, triggerNotifications]);
};
