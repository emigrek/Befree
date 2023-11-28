export enum GoalType {
  Day = 'day',
  ThreeDays = 'three-days',
  Week = 'week',
  Month = 'month',
  HalfYear = 'half-year',
  Year = 'year',
}

export interface GoalTypeTimeDiff {
  goalType: GoalType;
  timeDiff: number;
}

export interface Goal {
  goalAt: Date;
  goalType: GoalType;
}

export interface Achievement {
  goal: Goal;
  progress: number;
  achievedAt?: Date;
}
