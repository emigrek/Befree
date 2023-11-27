import { differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goals } from './goals';
import { Achivement } from './types';

import useLongestAbsence from '@/hooks/addiction/useLongestAbsence';

interface UseAchievementsProps {
  addiction: Addiction;
}

export const useAchivements = ({
  addiction,
}: UseAchievementsProps): Achivement[] => {
  const { start, end } = useLongestAbsence({ addiction });
  const achivements = useMemo(() => {
    return goals.map(goal => {
      const longestAbsenceDiff = differenceInMilliseconds(end, start);
      const progress = Math.min(1, longestAbsenceDiff / goal.timeDiff);
      const goalAt = new Date(start.getTime() + goal.timeDiff);

      return {
        goal: {
          goalAt,
          goalType: goal.goalType,
        },
        progress,
      };
    });
  }, [start, end]);

  return achivements;
};
