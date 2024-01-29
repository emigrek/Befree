import { add, differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goalTimeDiffs } from './goalTimeDiffs';

export const useGoal = (lastRelapseDate: Date | null) => {
  return useMemo(() => {
    if (!lastRelapseDate) {
      return null;
    }

    return getGoal(lastRelapseDate);
  }, [lastRelapseDate]);
};

export const getGoal = (lastRelapseDate: Date) => {
  const diff = differenceInMilliseconds(new Date(), lastRelapseDate);

  const { goalType, timeDiff } =
    goalTimeDiffs.find(goal => goal.timeDiff > diff) ||
    goalTimeDiffs[goalTimeDiffs.length - 1];

  const periodsPassed = Math.ceil(diff / timeDiff);

  const goalAt = add(lastRelapseDate, {
    seconds: (periodsPassed * timeDiff) / 1000,
  });

  return {
    goalAt,
    goalType,
  };
};
