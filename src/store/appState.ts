import { AppState, AppStateStatus } from 'react-native';
import { StateCreator } from 'zustand';

export interface AppStateSlice {
  appState: AppStateStatus;
  setAppState: (appState: AppStateStatus) => void;
}

export const createAppStateSlice: StateCreator<AppStateSlice> = set => ({
  appState: AppState.currentState,
  setAppState: (appState: AppStateStatus) => set({ appState }),
});
