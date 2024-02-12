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
    const longestAbsence = this.getLongestAbstinence(sortedRelapses);

    const currentAbsence = {
      start: lastRelapse,
      end: null,
    };

    const goal = GoalManager.getGoalDurations().find(
      goal => goal.goalType === goalType,
    );

    if (!goal) {
      return null;
    }

    const longestAbsenceDiff = differenceInMilliseconds(
      longestAbsence.end === null ? new Date() : longestAbsence.end,
      longestAbsence.start,
    );

    const currentAbsenceDiff = differenceInMilliseconds(
      new Date(),
      currentAbsence.start,
    );

    const achieved =
      longestAbsenceDiff >= goal.timeDiff ||
      currentAbsenceDiff >= goal.timeDiff;

    const progress = achieved
      ? 1
      : Math.min(1, currentAbsenceDiff / goal.timeDiff);

    const goalAt = new Date(
      (achieved ? longestAbsence.start : currentAbsence.start).getTime() +
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

    for (let i = 0; i < dates.length - 1; i++) {
      const current = dates[i];
      const next = dates[i + 1];
      const difference = next.getTime() - current.getTime();

      if (difference > maxDifference) {
        maxDifference = difference;
        longestPeriod = { start: current, end: next };
      }
    }

    if (longestPeriod.end?.getTime() === new Date().getTime()) {
      longestPeriod.end = null;
    }

    return longestPeriod;
  }
}

export { AchievementManager };
