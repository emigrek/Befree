import { StateCreator } from 'zustand';

export interface AppSlice {
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
}

export const createAppSlice: StateCreator<AppSlice> = set => ({
  onboarded: false,
  setOnboarded: (onboarded: boolean) => set({ onboarded }),
});
