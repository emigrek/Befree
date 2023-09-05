import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum Themes {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type Theme = `${Themes}`;

interface ThemeStoreProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStoreProps>()(
  persist(
    set => ({
      theme: Themes.System,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
