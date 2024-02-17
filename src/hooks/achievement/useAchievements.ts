import { useMemo } from 'react';

import { AchievementManager } from '@/services/managers/local';

interface UseAchievementsProps {
  addiction: Addiction;
}

export const useAchievements = ({
  addiction,
}: UseAchievementsProps): Achievement[] => {
  return useMemo(() => {
    const relapses = [
      ...addiction.relapses.map(r => new Date(r.relapseAt)),
      new Date(addiction.startedAt),
    ];
    return AchievementManager.getAchievements(relapses);
  }, [addiction]);
};
