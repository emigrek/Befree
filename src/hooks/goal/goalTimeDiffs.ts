import { Goals, GoalTimeDiff } from './types';

export const goalTimeDiffs: GoalTimeDiff[] = [
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
