export enum GoalType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  HalfYear = 'half-year',
  Year = 'year',
  TwoYears = 'two-years',
  ThreeYears = 'three-years',
}

export interface GoalTypeTimeDiff {
  goalType: GoalType;
  timeDiff: number;
}

export interface Goal {
  goalAt: Date;
  goalType: GoalType;
}

export interface Achivement {
  goal: Goal;
  progress: number;
}
