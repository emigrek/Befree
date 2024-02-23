import { add, differenceInMilliseconds } from 'date-fns';

import { Addiction } from './Addiction';

export interface Goal {
  goalAt: Date;
  goalType: Goals;
}

export enum Goals {
  TenMinutes = 'ten-minutes',
  ThirtyMinutes = 'thirty-minutes',
  OneHour = 'one-hour',
  ThreeHours = 'three-hours',
  HalfDay = 'half-day',
  Day = 'day',
  ThreeDays = 'three-days',
  Week = 'week',
  Month = 'month',
  ThreeMonths = 'three-months',
  Quarter = 'quarter',
  HalfYear = 'half-year',
  NineMonths = 'nine-months',
  Year = 'year',
}

export type GoalDurationByType = {
  goalType: Goals;
  timeDiff: number;
};

class GoalManager {
  private goalDurationsByType: GoalDurationByType[] = [
    { goalType: Goals.TenMinutes, timeDiff: 600000 },
    { goalType: Goals.ThirtyMinutes, timeDiff: 1800000 },
    { goalType: Goals.OneHour, timeDiff: 3600000 },
    { goalType: Goals.ThreeHours, timeDiff: 10800000 },
    { goalType: Goals.HalfDay, timeDiff: 43200000 },
    { goalType: Goals.Day, timeDiff: 86400000 },
    { goalType: Goals.ThreeDays, timeDiff: 259200000 },
    { goalType: Goals.Week, timeDiff: 604800000 },
    { goalType: Goals.Month, timeDiff: 2592000000 },
    { goalType: Goals.ThreeMonths, timeDiff: 7776000000 },
    { goalType: Goals.Quarter, timeDiff: 7776000000 },
    { goalType: Goals.HalfYear, timeDiff: 15552000000 },
    { goalType: Goals.NineMonths, timeDiff: 23328000000 },
    { goalType: Goals.Year, timeDiff: 31536000000 },
  ];
  private addiction: Addiction;

  constructor(addiction: Addiction) {
    this.addiction = addiction;
  }

  get goal(): Goal {
    const diff = differenceInMilliseconds(
      new Date(),
      new Date(this.addiction.lastRelapse.relapseAt),
    );

    const { goalType, timeDiff } =
      this.goalDurationsByType.find(goal => goal.timeDiff > diff) ||
      this.goalDurationsByType[this.goalDurationsByType.length - 1];

    const periodsPassed = Math.ceil(diff / timeDiff);

    const goalAt = add(new Date(this.addiction.lastRelapse.relapseAt), {
      seconds: (periodsPassed * timeDiff) / 1000,
    });

    return {
      goalAt,
      goalType,
    };
  }

  get progress(): number {
    const { goalAt } = this.goal;

    const diff = differenceInMilliseconds(goalAt, new Date());
    const duration = this.getGoalDuration(this.goal.goalType);

    if (!duration) {
      return 0;
    }

    return 1 - Math.min(1, diff / duration.timeDiff);
  }

  public getGoalDuration(goalType: Goals): GoalDurationByType | undefined {
    return this.goalDurationsByType.find(goal => goal.goalType === goalType);
  }

  public getGoalDurations(): GoalDurationByType[] {
    return this.goalDurationsByType;
  }
}

export { GoalManager };
