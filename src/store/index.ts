import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ThemeSlice, createThemeSlice } from './theme';

export const useGlobalStore = create<ThemeSlice>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
