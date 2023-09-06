import { StateCreator } from 'zustand';

export enum Themes {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type Theme = `${Themes}`;

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = set => ({
  theme: Themes.System,
  setTheme: (theme: Theme) => set({ theme }),
});
