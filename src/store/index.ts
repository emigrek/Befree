import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AddictionsSlice, createAddictionsSlice } from './addictions';
import { AppSlice, createAppSlice } from './app';
import { AppStateSlice, createAppStateSlice } from './appState';
import {
  LocalAuthenticationSlice,
  createLocalAuthenticationSlice,
} from './localAuthentication';
import { NetInfoSlice, createNetInfoSlice } from './netInfo';
import {
  NotificationsBlacklistSlice,
  createNotificationsBlacklistSlice,
} from './notificationsBlacklist';
import { SelectionSlice, createSelectionSlice } from './selection';
import { SessionSlice, createSessionSlice } from './session';
import { ThemeSlice, createThemeSlice } from './theme';
import {
  TriggerNotificationsSlice,
  createTriggerNotificationsSlice,
} from './triggerNotifications';

import { Addiction, Relapse } from '@/structures';

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

export const useAddictionsStore = create<AddictionsSlice>()((...a) => ({
  ...createAddictionsSlice(...a),
}));

export const useNetInfoStore = create<NetInfoSlice>()((...a) => ({
  ...createNetInfoSlice(...a),
}));

export const useAuthStore = create<SessionSlice>()((...a) => ({
  ...createSessionSlice(...a),
}));

export const useLocalAuthStore = create<LocalAuthenticationSlice>()((...a) => ({
  ...createLocalAuthenticationSlice(...a),
}));

export const useAppStateStore = create<AppStateSlice>()((...a) => ({
  ...createAppStateSlice(...a),
}));

export const useTriggerNotificationsStore = create<TriggerNotificationsSlice>()(
  (...a) => ({
    ...createTriggerNotificationsSlice(...a),
  }),
);

export const useNotificationsBlacklistStore =
  create<NotificationsBlacklistSlice>()((...a) => ({
    ...createNotificationsBlacklistSlice(...a),
  }));

export const useAddictionsSelectionStore = create<SelectionSlice<Addiction>>(
  createSelectionSlice<Addiction>(),
);

export const useRelapsesSelectionStore = create<SelectionSlice<Relapse>>(
  createSelectionSlice<Relapse>(),
);
