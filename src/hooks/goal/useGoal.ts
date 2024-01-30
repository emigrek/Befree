import { add, differenceInMilliseconds } from 'date-fns';

import { goalTimeDiffs } from './goalTimeDiffs';

export const useGoal = (lastRelapse: Date | null) => {
  return lastRelapse ? getGoal(lastRelapse) : null;
};

export const getGoal = (lastRelapse: Date) => {
  const diff = differenceInMilliseconds(new Date(), lastRelapse);

  const { goalType, timeDiff } =
    goalTimeDiffs.find(goal => goal.timeDiff > diff) ||
    goalTimeDiffs[goalTimeDiffs.length - 1];

  const periodsPassed = Math.ceil(diff / timeDiff);

  const goalAt = add(lastRelapse, {
    seconds: (periodsPassed * timeDiff) / 1000,
  });

  return {
    goalAt,
    goalType,
  };
};
