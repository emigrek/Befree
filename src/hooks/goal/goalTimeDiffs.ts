import { Goals, GoalTimeDiff } from './types';

export const goalTimeDiffs: GoalTimeDiff[] = [
  { goalType: Goals.Day, timeDiff: 86400000 },
  { goalType: Goals.ThreeDays, timeDiff: 259200000 },
  { goalType: Goals.Week, timeDiff: 604800000 },
  { goalType: Goals.Month, timeDiff: 2592000000 },
  { goalType: Goals.HalfYear, timeDiff: 15552000000 },
  { goalType: Goals.Year, timeDiff: 31536000000 },
];
