import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AppSlice, createAppSlice } from './app';
import { SessionSlice, createSessionSlice } from './session';
import { ThemeSlice, createThemeSlice } from './theme';

import { SecureAuthStore } from '@/utils';

export const useGlobalStore = create<ThemeSlice & AppSlice>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createAppSlice(...a),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useAuthStore = create<SessionSlice>()(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => SecureAuthStore),
    },
  ),
);
