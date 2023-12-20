import notifee, { TriggerType } from '@notifee/react-native';

import { Goals } from './types';
import { getAchievement } from './useAchievement';
import { getAchievements } from './useAchievements';

import i18n from '@/i18n';

export const addNotification = async ({
  addiction,
  goalType,
}: {
  addiction: Addiction;
  goalType: Goals;
}) => {
  const achievement = getAchievement({ addiction, goalType });

  if (!achievement) {
    return;
  }

  const { goal } = achievement;

  const channel = await notifee.getChannel('default');

  await notifee.createTriggerNotification(
    {
      title: i18n.t(['notifications', 'achievement', 'title']),
      body: i18n.t(['notifications', 'achievement', 'body'], {
        name: addiction.name,
        goalType: i18n.t(['goals', goal.goalType]),
      }),
      android: {
        channelId: channel?.id,
        pressAction: {
          id: `show-achievement`,
          launchActivity: 'default',
        },
      },
      data: {
        addictionId: addiction.id,
        goalType: goal.goalType,
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: goal.goalAt.getTime(),
    },
  );
};

export const addAllNotifications = async ({
  addiction,
}: {
  addiction: Addiction;
}) => {
  const achievements = getAchievements({ addiction });

  await Promise.all(
    achievements.map(
      achievement =>
        achievement.progress < 1 &&
        addNotification({
          addiction,
          goalType: achievement.goal.goalType,
        }),
    ),
  );
};

export const removeAllNotifications = async ({
  addictionId,
}: {
  addictionId: string;
}) => {
  const triggerNotifications = await notifee.getTriggerNotifications();

  const toRemove = triggerNotifications.filter(({ notification }) => {
    const data = notification.data;
    return data?.addictionId === addictionId;
  });

  await Promise.all(
    toRemove.map(({ notification }) => {
      if (!notification.id) return;
      return notifee.cancelNotification(notification.id);
    }),
  );
};
