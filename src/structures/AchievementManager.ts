import { differenceInMilliseconds } from 'date-fns';

import { AchievementNotificationsManager } from './AchievementNotificationsManager';
import { Goals } from './GoalManager';

import { Addiction } from '@/structures';

export interface Abstinence {
  start: Date;
  end: Date | null;
}

class AchievementManager {
  private addiction: Addiction;

  notifications: AchievementNotificationsManager;

  constructor(addiction: Addiction) {
    this.addiction = addiction;
    this.notifications = new AchievementNotificationsManager(addiction);
  }

  public getAchievement(goalType: Goals): Achievement | null {
    const latestAbstinence = this.getLatestAbstinence();
    const currentAbstinence = {
      start: new Date(this.addiction.lastRelapse.relapseAt),
      end: null,
    };

    const goal = this.addiction.goals.getGoalDuration(goalType);
    if (!goal) {
      return null;
    }

    const latestAbstinenceDiff = differenceInMilliseconds(
      latestAbstinence.end === null ? new Date() : latestAbstinence.end,
      latestAbstinence.start,
    );

    const achieved = latestAbstinenceDiff >= goal.timeDiff;

    const progress = achieved
      ? 1
      : Math.min(1, latestAbstinenceDiff / goal.timeDiff);

    const goalAt = new Date(
      (achieved ? latestAbstinence.start : currentAbstinence.start).getTime() +
        goal.timeDiff,
    );

    const achievedAt = achieved ? goalAt : undefined;

    return {
      goal: {
        goalAt,
        goalType: goal.goalType,
      },
      achievedAt,
      progress,
    };
  }

  public getAchievements(): Achievement[] {
    return this.addiction.goals.getGoalDurations().map(goal => {
      const achievement = this.getAchievement(goal.goalType);
      return achievement as Achievement;
    });
  }

  public getLongestAbstinence(): Abstinence {
    const dates = [...this.addiction.relapseDates, new Date()];
    let maxDifference = 0;
    let longestPeriod: Abstinence = { start: new Date(dates[0]), end: null };

    if (dates.length === 1) {
      return longestPeriod;
    }

    for (let i = 0; i < dates.length; i++) {
      const current = dates[i];
      const next = dates[i + 1];
      const difference = new Date(next).getTime() - new Date(current).getTime();

      if (difference > maxDifference) {
        maxDifference = difference;
        longestPeriod = { start: current, end: next };
      }
    }

    return longestPeriod;
  }

  public getLatestAbstinence(): Abstinence {
    const sortedRelapses = this.addiction.relapseDates.sort(
      (a, b) => a.getTime() - b.getTime(),
    );
    const lastRelapse = sortedRelapses[sortedRelapses.length - 1];
    return {
      start: lastRelapse,
      end: new Date(),
    };
  }
}

export { AchievementManager };
