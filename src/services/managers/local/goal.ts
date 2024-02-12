import { add, differenceInMilliseconds } from 'date-fns';

export interface Goal {
  goalAt: Date;
  goalType: Goals;
}

export enum Goals {
  TenMinutes = 'ten-minutes',
  ThirtyMinutes = 'thirty-minutes',
  OneHour = 'one-hour',
  HalfDay = 'half-day',
  Day = 'day',
  ThreeDays = 'three-days',
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  HalfYear = 'half-year',
  Year = 'year',
}

class GoalManager {
  private static goalDurationsByType: {
    goalType: Goals;
    timeDiff: number;
  }[] = [
    { goalType: Goals.TenMinutes, timeDiff: 600000 },
    { goalType: Goals.ThirtyMinutes, timeDiff: 1800000 },
    { goalType: Goals.OneHour, timeDiff: 3600000 },
    { goalType: Goals.HalfDay, timeDiff: 43200000 },
    { goalType: Goals.Day, timeDiff: 86400000 },
    { goalType: Goals.ThreeDays, timeDiff: 259200000 },
    { goalType: Goals.Week, timeDiff: 604800000 },
    { goalType: Goals.Month, timeDiff: 2592000000 },
    { goalType: Goals.Quarter, timeDiff: 7776000000 },
    { goalType: Goals.HalfYear, timeDiff: 15552000000 },
    { goalType: Goals.Year, timeDiff: 31536000000 },
  ];

  public static getGoal(lastRelapse: Date): Goal {
    const diff = differenceInMilliseconds(new Date(), lastRelapse);

    const { goalType, timeDiff } =
      this.goalDurationsByType.find(goal => goal.timeDiff > diff) ||
      this.goalDurationsByType[this.goalDurationsByType.length - 1];

    const periodsPassed = Math.ceil(diff / timeDiff);

    const goalAt = add(lastRelapse, {
      seconds: (periodsPassed * timeDiff) / 1000,
    });

    return {
      goalAt,
      goalType,
    };
  }

  public static checkProgress(
    lastRelapse: Date,
    currentGoal: Goal,
  ): Achievement {
    const now = new Date();
    const diff = differenceInMilliseconds(now, lastRelapse);
    const totalDiff = differenceInMilliseconds(currentGoal.goalAt, lastRelapse);
    const progress = Math.min(100, (diff / totalDiff) * 100);

    const achievement: Achievement = {
      goal: currentGoal,
      progress,
      achievedAt: progress >= 100 ? now : undefined,
    };

    return achievement;
  }

  public static getGoalDurations(): { goalType: Goals; timeDiff: number }[] {
    return this.goalDurationsByType;
  }
}

export { GoalManager };
