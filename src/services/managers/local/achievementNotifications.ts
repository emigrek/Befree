import notifee, { TriggerType } from '@notifee/react-native';
import { format } from 'date-fns';

import { AchievementManager } from './achievement';
import { GoalManager, Goals } from './goal';

import i18n from '@/i18n';

class AchievementNotificationsManager {
  public static schedule = async (addiction: Addiction, goalType: Goals) => {
    const relapses = [
      ...addiction.relapses.map(r => new Date(r.relapseAt)),
      addiction.startedAt,
    ];

    const achievement = AchievementManager.getAchievement(relapses, goalType);

    if (!achievement || achievement.progress === 1) {
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
    console.log(
      `Scheduled achievement notification for ${addiction.name} (${
        goal.goalType
      }), at ${format(goal.goalAt, 'yyyy-MM-dd HH:mm:ss')}`,
    );
  };

  public static scheduleAll = (addiction: Addiction) => {
    const promises = GoalManager.getGoalDurations().map(goal => {
      return this.schedule(addiction, goal.goalType);
    });

    return Promise.all(promises);
  };

  public static cancelAll = async (addiction: Addiction) => {
    const triggerNotifications = await notifee.getTriggerNotifications();

    const toRemove = triggerNotifications.filter(({ notification }) => {
      const data = notification.data;
      return data?.addictionId === addiction.id;
    });

    return Promise.all(
      toRemove.map(({ notification }) => {
        if (!notification.id) return;
        console.log('Canceling notification: ', notification.id);
        return notifee.cancelNotification(notification.id);
      }),
    );
  };

  public static clear = async () => {
    const triggerNotifications = await notifee.getTriggerNotifications();

    return Promise.all(
      triggerNotifications.map(({ notification }) => {
        if (!notification.id) return;
        console.log('Canceling notification: ', notification.id);
        return notifee.cancelNotification(notification.id);
      }),
    );
  };

  public static reload = async (addiction: Addiction) => {
    return Promise.all([
      this.cancelAll(addiction),
      this.scheduleAll(addiction),
    ]);
  };
}

export { AchievementNotificationsManager };
