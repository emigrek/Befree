import notifee, { TriggerType } from '@notifee/react-native';
import { format } from 'date-fns';

import { Goals } from './GoalManager';

import i18n from '@/i18n';
import { NotificationsManager } from '@/services/managers/local';
import { Addiction } from '@/structures';

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
    const achievement = this.addiction.achievements.getAchievement(goalType);

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

  reschedule = async () => {
    const scheduled = await this.getAll();
    const scheduledGoalTypes = scheduled.map(({ notification }) => {
      return notification.data?.goalType;
    });

    const goalTypes = this.addiction.goals
      .getGoalDurations()
      .map(goal => goal.goalType);
    const promises = goalTypes.map(goalType => {
      if (!scheduledGoalTypes.includes(goalType)) return;
      this.cancel(goalType);
      this.schedule(goalType);
    });

    return Promise.all(promises);
  };

  scheduleAll = () => {
    const promises = this.addiction.goals.getGoalDurations().map(goal => {
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
