import { add, differenceInMilliseconds } from 'date-fns';

import { goalTimeDiffs } from './goalTimeDiffs';

export const useGoal = (date: Date) => {
  const timeDiff = differenceInMilliseconds(new Date(), date);
  const goalTimeDiff =
    goalTimeDiffs.find(goal => goal.timeDiff > timeDiff) ||
    goalTimeDiffs[goalTimeDiffs.length - 1];

  return {
    goalAt: add(date, { seconds: goalTimeDiff.timeDiff / 1000 }),
    goalType: goalTimeDiff.goalType,
  };
};
