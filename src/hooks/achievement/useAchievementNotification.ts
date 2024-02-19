import { useMemo } from 'react';

import { useTriggerNotificationsStore } from '@/store';
import { Addiction } from '@/structures';

interface UseAchievementNotification {
  addiction: Addiction;
  achievement: Achievement;
}

const useAchievementNotification = ({
  addiction,
  achievement,
}: UseAchievementNotification) => {
  const triggerNotifications = useTriggerNotificationsStore(
    state => state.triggerNotifications,
  );

  return useMemo(
    () =>
      triggerNotifications.find(
        triggerNotification =>
          triggerNotification.notification?.data?.addictionId ===
            addiction.id &&
          triggerNotification.notification?.data?.goalType ===
            achievement.goal.goalType,
      ),
    [addiction, achievement, triggerNotifications],
  );
};

export { useAchievementNotification };
