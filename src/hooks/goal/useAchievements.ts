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

      const currentAbsenceEnd = new Date();
      const currentAbsenceDiff = differenceInMilliseconds(
        currentAbsenceEnd,
        currentAbsence.start,
      );

      const isAchieved =
        longestAbsenceDiff >= goal.timeDiff ||
        currentAbsenceDiff >= goal.timeDiff;

      const progress = isAchieved
        ? 1
        : Math.min(1, currentAbsenceDiff / goal.timeDiff);

      const goalAt = new Date(
        (isAchieved ? longestAbsence.start : currentAbsence.start).getTime() +
          goal.timeDiff,
      );

      const achievedAt = isAchieved ? goalAt : undefined;

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
