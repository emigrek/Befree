import { add, differenceInMilliseconds } from 'date-fns';

import { goals } from './goals';
import { GoalType } from './types';

export const useGoal = (date: Date) => {
  const timeDiff = differenceInMilliseconds(new Date(), date);
  const goal = goals.find(goal => goal.timeDiff > timeDiff);

  const goalAt = goal
    ? add(date, { seconds: goal.timeDiff / 1000 })
    : add(date, { years: 1 });

  const goalType = goal ? goal.goalType : GoalType.Year;

  return { goalAt, goalType };
};
