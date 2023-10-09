import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddictionsSlice, createAddictionsSlice } from './addictions';
import { AppSlice, createAppSlice } from './app';
import {
  CreationWizardSlice,
  createCreationWizardSlice,
} from './creationWizard';
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

export const useAuthStore = create<SessionSlice>()((...a) => ({
  ...createSessionSlice(...a),
}));

export const useCreationWizardStore = create<CreationWizardSlice>()((...a) => ({
  ...createCreationWizardSlice(...a),
}));
