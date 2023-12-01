import { StateCreator } from 'zustand';

import { Achievement } from '@/hooks/goal/types';

export interface AchievementModalSlice {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  achievement: Achievement | undefined;
  setAchievement: (achievement: Achievement | undefined) => void;
  addiction: Addiction | undefined;
  setAddiction: (addiction: Addiction | undefined) => void;
}

export const createAchievementModalSlice: StateCreator<
  AchievementModalSlice
> = set => ({
  visible: false,
  setVisible: (visible: boolean) => set({ visible }),
  achievement: undefined,
  setAchievement: (achievement: Achievement | undefined) =>
    set({ achievement }),
  addiction: undefined,
  setAddiction: (addiction: Addiction | undefined) => set({ addiction }),
});
