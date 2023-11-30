import { differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goalTimeDiffs } from './goalTimeDiffs';
import { Goals } from './types';

import useLongestAbsence from '@/hooks/addiction/useLongestAbsence';

interface UseAchievement {
  addiction: Addiction;
  goalType: Goals;
}

export const useAchievement = ({ addiction, goalType }: UseAchievement) => {
  const { lastRelapse } = addiction;

  const longestAbsence = useLongestAbsence({ addiction });
  const currentAbsence = useMemo(() => {
    return {
      start: lastRelapse,
      end: null,
    };
  }, [lastRelapse]);

  return useMemo(() => {
    const goalTimeDiff = goalTimeDiffs.find(goal => goal.goalType === goalType);

    if (!goalTimeDiff) {
      return null;
    }

    const longestAbsenceDiff = differenceInMilliseconds(
      longestAbsence.end === null ? new Date() : longestAbsence.end,
      longestAbsence.start,
    );

    const currentAbsenceDiff = differenceInMilliseconds(
      new Date(),
      currentAbsence.start,
    );

    const achieved =
      longestAbsenceDiff >= goalTimeDiff.timeDiff ||
      currentAbsenceDiff >= goalTimeDiff.timeDiff;

    const progress = achieved
      ? 1
      : Math.min(1, currentAbsenceDiff / goalTimeDiff.timeDiff);

    const goalAt = new Date(
      (achieved ? longestAbsence.start : currentAbsence.start).getTime() +
        goalTimeDiff.timeDiff,
    );

    const achievedAt = achieved ? goalAt : undefined;

    return {
      goal: {
        goalAt,
        goalType: goalTimeDiff.goalType,
      },
      achievedAt,
      progress,
    };
  }, [currentAbsence.start, goalType, longestAbsence]);
};
