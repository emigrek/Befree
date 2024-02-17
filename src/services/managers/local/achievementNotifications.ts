import notifee, { TriggerType } from '@notifee/react-native';
import { format } from 'date-fns';

import { AchievementManager } from './achievement';
import { GoalManager, Goals } from './goal';
import { NotificationsManager } from './notifications';

import i18n from '@/i18n';

class AchievementNotificationsManager {
  private addiction: Addiction;

  constructor(addiction: Addiction) {
    this.addiction = addiction;
  }

  get = async (goalType: Goals) => {
    const triggerNotifications = await notifee.getTriggerNotifications();

    return triggerNotifications.find(({ notification }) => {
      const data = notification.data;
      return (
        data?.addictionId === this.addiction.id && data?.goalType === goalType
      );
    });
  };

  getAll = async () => {
    const triggerNotifications = await notifee.getTriggerNotifications();

    return triggerNotifications.filter(({ notification }) => {
      const data = notification.data;
      return data?.addictionId === this.addiction.id;
    });
  };

  schedule = async (goalType: Goals) => {
    const relapses = [
      ...this.addiction.relapses.map(r => new Date(r.relapseAt)),
      this.addiction.startedAt,
    ];

    const achievement = AchievementManager.getAchievement(relapses, goalType);

    if (!achievement || achievement.progress === 1) {
      return;
    }

    const { goal } = achievement;

    const channel = await notifee.getChannel('default');
    await NotificationsManager.getInstance().scheduleTrigger(
      {
        title: i18n.t(['notifications', 'achievement', 'title']),
        body: i18n.t(['notifications', 'achievement', 'body'], {
          name: this.addiction.name,
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
          addictionId: this.addiction.id,
          goalType: goal.goalType,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: goal.goalAt.getTime(),
      },
    );

    console.log(
      `Scheduled achievement notification for ${this.addiction.name} (${
        goal.goalType
      }), at ${format(goal.goalAt, 'yyyy-MM-dd HH:mm:ss')}`,
    );
  };

  scheduleAll = () => {
    const promises = GoalManager.getGoalDurations().map(goal => {
      return this.schedule(goal.goalType);
    });

    return Promise.all(promises);
  };

  cancel = async (goalType: Goals) => {
    const toRemove = await this.get(goalType);

    if (!toRemove) return;

    const { notification } = toRemove;

    if (!notification.id) return;

    return NotificationsManager.getInstance().cancelTrigger(notification.id);
  };

  cancelAll = async () => {
    const toRemove = await this.getAll();

    return Promise.all(
      toRemove.map(({ notification }) => {
        if (!notification.id) return;
        return NotificationsManager.getInstance().cancelTrigger(
          notification.id,
        );
      }),
    );
  };

  reloadAll = async () => {
    await this.cancelAll();
    await this.scheduleAll();
  };
}

export { AchievementNotificationsManager };
