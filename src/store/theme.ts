import { StateCreator } from 'zustand';

export enum Themes {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type Theme = `${Themes}`;

export type ThemeMap = { [key: number]: string };

export const lightsOutMap: ThemeMap = {
  1: 'lightsOut',
  0: 'dim',
};

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lightsOut: boolean;
  setLightsOut: (lightsOut: boolean) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = set => ({
  theme: Themes.System,
  setTheme: (theme: Theme) => set({ theme }),
  lightsOut: false,
  setLightsOut: (lightsOut: boolean) => set({ lightsOut }),
});
