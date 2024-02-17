import { useMemo } from 'react';

import { AchievementManager, Goals } from '@/services/managers/local';

interface UseAchievementProps {
  addiction: Addiction;
  goalType: Goals;
}

export const useAchievement = ({
  addiction,
  goalType,
}: UseAchievementProps): Achievement | null => {
  return useMemo(() => {
    const relapses = [
      ...addiction.relapses.map(r => new Date(r.relapseAt)),
      new Date(addiction.startedAt),
    ];

    return AchievementManager.getAchievement(relapses, goalType);
  }, [addiction, goalType]);
};
