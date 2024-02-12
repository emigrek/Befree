import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddictionsSlice, createAddictionsSlice } from './addictions';
import { AppSlice, createAppSlice } from './app';
import { NetInfoSlice, createNetInfoSlice } from './netInfo';
import { SelectionSlice, createSelectionSlice } from './selection';
import { SessionSlice, createSessionSlice } from './session';
import { ThemeSlice, createThemeSlice } from './theme';

export const useGlobalStore = create<ThemeSlice & AppSlice & AddictionsSlice>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createAppSlice(...a),
      ...createAddictionsSlice(...a),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useNetInfoStore = create<NetInfoSlice>()((...a) => ({
  ...createNetInfoSlice(...a),
}));

export const useAuthStore = create<SessionSlice>()((...a) => ({
  ...createSessionSlice(...a),
}));

export const useAddictionsSelectionStore = create<SelectionSlice<Addiction>>(
  createSelectionSlice<Addiction>(),
);

export const useRelapsesSelectionStore = create<SelectionSlice<Relapse>>(
  createSelectionSlice<Relapse>(),
);
