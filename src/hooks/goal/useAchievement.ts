import { differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goalTimeDiffs } from './goalTimeDiffs';
import { Achievement, Goals } from './types';

import useLongestAbsence from '@/hooks/addiction/useLongestAbsence';

interface UseAchievementProps {
  addiction: Addiction;
  goalType: Goals;
}

export const useAchievement = ({
  addiction,
  goalType,
}: UseAchievementProps): Achievement | null => {
  const { lastRelapse } = addiction;

  const longestAbsence = useLongestAbsence({ addiction });
  const currentAbsence = useMemo(() => {
    return {
      start: lastRelapse,
      end: null,
    };
  }, [lastRelapse]);

  return useMemo(() => {
    const goal = goalTimeDiffs.find(goal => goal.goalType === goalType);

    if (!goal) {
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
      longestAbsenceDiff >= goal.timeDiff ||
      currentAbsenceDiff >= goal.timeDiff;

    const progress = achieved
      ? 1
      : Math.min(1, currentAbsenceDiff / goal.timeDiff);

    const goalAt = new Date(
      (achieved ? longestAbsence.start : currentAbsence.start).getTime() +
        goal.timeDiff,
    );

    const achievedAt = achieved ? goalAt : undefined;

    return {
      goal: {
        goalAt,
        goalType: goal.goalType,
      },
      achievedAt,
      progress,
    };
  }, [currentAbsence.start, longestAbsence, goalType]);
};
