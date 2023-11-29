import { differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goals } from './goals';
import { Achievement } from './types';

import useLongestAbsence from '@/hooks/addiction/useLongestAbsence';

interface UseAchievementsProps {
  addiction: Addiction;
}

export const useAchievements = ({
  addiction,
}: UseAchievementsProps): Achievement[] => {
  const { lastRelapse } = addiction;

  const longestAbsence = useLongestAbsence({ addiction });
  const currentAbsence = useMemo(() => {
    return {
      start: lastRelapse,
      end: null,
    };
  }, [lastRelapse]);

  return useMemo(() => {
    return goals.map(goal => {
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
    });
  }, [currentAbsence.start, longestAbsence]);
};
