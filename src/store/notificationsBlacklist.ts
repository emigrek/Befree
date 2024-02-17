import { StateCreator } from 'zustand';

export interface NotificationsBlacklistSlice {
  blacklisted: string[];
  setBlacklisted: (blacklisted: string[]) => void;
  addBlacklisted: (id: string) => void;
  removeBlacklisted: (id: string) => void;
}

export const createNotificationsBlacklistSlice: StateCreator<
  NotificationsBlacklistSlice
> = set => ({
  blacklisted: [],
  setBlacklisted: blacklisted => set({ blacklisted }),
  addBlacklisted: id =>
    set(state => ({ blacklisted: [...state.blacklisted, id] })),
  removeBlacklisted: id =>
    set(state => ({
      blacklisted: state.blacklisted.filter(
        blacklistedId => blacklistedId !== id,
      ),
    })),
});
