import { differenceInMilliseconds } from 'date-fns';
import { useMemo } from 'react';

import { goalTimeDiffs } from './goalTimeDiffs';
import { Achievement } from './types';

import { getLongestAbsence } from '@/hooks/addiction/useLongestAbsence';
import { getLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';

interface UseAchievementsProps {
  addiction: Addiction;
}

export const useAchievements = ({
  addiction,
}: UseAchievementsProps): Achievement[] => {
  return useMemo(() => {
    return getAchievements({ addiction });
  }, [addiction]);
};

export const getAchievements = ({
  addiction,
}: UseAchievementsProps): Achievement[] => {
  const lastRelapse = getLastRelapse({ addiction });

  const longestAbsence = getLongestAbsence({ addiction });
  const currentAbsence = {
    start: lastRelapse ? lastRelapse : new Date(),
    end: null,
  };

  return goalTimeDiffs.map(goal => {
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
};
