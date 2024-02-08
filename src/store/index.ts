import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddictionsSlice, createAddictionsSlice } from './addictions';
import {
  AddictionsSelectionSlice,
  createAddictionsSelectionSlice,
} from './addictionsSelection';
import { AppSlice, createAppSlice } from './app';
import { NetInfoSlice, createNetInfoSlice } from './netInfo';
import { NotificationsSlice, createNotificationsSlice } from './notifications';
import {
  RelapsesSelectionSlice,
  createRelapsesSelectionSlice,
} from './relapsesSelection';
import { SessionSlice, createSessionSlice } from './session';
import { ThemeSlice, createThemeSlice } from './theme';

export const useGlobalStore = create<
  ThemeSlice & AppSlice & AddictionsSlice & NotificationsSlice
>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createAppSlice(...a),
      ...createAddictionsSlice(...a),
      ...createNotificationsSlice(...a),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useAddictionsSelectionStore = create<AddictionsSelectionSlice>()(
  (...a) => ({
    ...createAddictionsSelectionSlice(...a),
  }),
);

export const useRelapsesSelectionStore = create<RelapsesSelectionSlice>()(
  (...a) => ({
    ...createRelapsesSelectionSlice(...a),
  }),
);

export const useNetInfoStore = create<NetInfoSlice>()((...a) => ({
  ...createNetInfoSlice(...a),
}));

export const useAuthStore = create<SessionSlice>()((...a) => ({
  ...createSessionSlice(...a),
}));
