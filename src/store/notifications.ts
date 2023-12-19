import { NotificationSettings } from '@notifee/react-native';
import { StateCreator } from 'zustand';

export interface NotificationsSlice {
  notificationsSettings: NotificationSettings | undefined;
  setNotificationsSettings: (
    notificationsSettings: NotificationSettings | undefined,
  ) => void;
  blacklist: string[];
  setBlacklist: (blacklist: string[]) => void;
  addBlacklist: (id: string) => void;
  removeBlacklist: (id: string) => void;
  isBlacklisted: (id: string) => boolean;
}

export const createNotificationsSlice: StateCreator<NotificationsSlice> = (
  set,
  get,
) => ({
  notificationsSettings: undefined,
  setNotificationsSettings: notificationsSettings =>
    set({ notificationsSettings }),
  blacklist: [],
  setBlacklist: blacklist => set({ blacklist }),
  addBlacklist: id => set(state => ({ blacklist: [...state.blacklist, id] })),
  removeBlacklist: id =>
    set(state => ({
      blacklist: state.blacklist.filter(item => item !== id),
    })),
  isBlacklisted: id => get().blacklist.includes(id),
});
