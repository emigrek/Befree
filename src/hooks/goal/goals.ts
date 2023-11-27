import { GoalType, GoalTypeTimeDiff } from './types';

export const goals: GoalTypeTimeDiff[] = [
  { goalType: GoalType.Day, timeDiff: 86400000 },
  { goalType: GoalType.Week, timeDiff: 604800000 },
  { goalType: GoalType.Month, timeDiff: 2592000000 },
  { goalType: GoalType.HalfYear, timeDiff: 15552000000 },
  { goalType: GoalType.Year, timeDiff: 31536000000 },
  { goalType: GoalType.TwoYears, timeDiff: 63072000000 },
  { goalType: GoalType.ThreeYears, timeDiff: 94608000000 },
];
