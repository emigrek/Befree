export enum Goals {
  Day = 'day',
  ThreeDays = 'three-days',
  Week = 'week',
  Month = 'month',
  HalfYear = 'half-year',
  Year = 'year',
}

export interface GoalTimeDiff {
  goalType: Goals;
  timeDiff: number;
}

export interface Goal {
  goalAt: Date;
  goalType: Goals;
}

export interface Achievement {
  goal: Goal;
  progress: number;
  achievedAt?: Date;
}
