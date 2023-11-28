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
  const { start, end } = useLongestAbsence({ addiction });

  return useMemo(() => {
    return goals.map(goal => {
      const longestAbsenceDiff = differenceInMilliseconds(end, start);
      const progress = Math.min(1, longestAbsenceDiff / goal.timeDiff);
      const goalAt = new Date(start.getTime() + goal.timeDiff);
      const achievedAt = progress === 1 ? goalAt : undefined;

      return {
        goal: {
          goalAt,
          goalType: goal.goalType,
        },
        achievedAt,
        progress,
      };
    });
  }, [start, end]);
};
