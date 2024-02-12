import { differenceInMilliseconds } from 'date-fns';

import { GoalManager, Goals } from './goal';

export interface Abstinence {
  start: Date;
  end: Date | null;
}

class AchievementManager {
  static getAchievement(relapses: Date[], goalType: Goals): Achievement | null {
    const sortedRelapses = relapses.sort((a, b) => a.getTime() - b.getTime());
    const lastRelapse = sortedRelapses[sortedRelapses.length - 1];
    const longestAbstinence = this.getLongestAbstinence(sortedRelapses);

    const currentAbstinence = {
      start: lastRelapse,
      end: null,
    };

    const goal = GoalManager.getGoalDurations().find(
      goal => goal.goalType === goalType,
    );

    if (!goal) {
      return null;
    }

    const longestAbstinenceDiff = differenceInMilliseconds(
      longestAbstinence.end === null ? new Date() : longestAbstinence.end,
      longestAbstinence.start,
    );

    const currentAbstinenceDiff = differenceInMilliseconds(
      new Date(),
      currentAbstinence.start,
    );

    const achieved =
      longestAbstinenceDiff >= goal.timeDiff ||
      currentAbstinenceDiff >= goal.timeDiff;

    const progress = achieved
      ? 1
      : Math.min(1, currentAbstinenceDiff / goal.timeDiff);

    const goalAt = new Date(
      (achieved ? longestAbstinence.start : currentAbstinence.start).getTime() +
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

  static getAchievements(relapses: Date[]): Achievement[] {
    return GoalManager.getGoalDurations().map(goal => {
      const achievement = this.getAchievement(relapses, goal.goalType);
      return achievement as Achievement;
    });
  }

  static getLongestAbstinence(relapses: Date[]): Abstinence {
    const dates = [...relapses, new Date()];
    let maxDifference = 0;
    let longestPeriod: Abstinence = { start: dates[0], end: null };

    if (dates.length === 1) {
      return longestPeriod;
    }

    for (let i = 0; i < dates.length - 1; i++) {
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
}

export { AchievementManager };
