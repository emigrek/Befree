import { TriggerNotification } from '@notifee/react-native';
import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface TriggerNotificationsSlice {
  triggerNotifications: TriggerNotification[];
  setTriggerNotifications: (
    triggerNotifications: TriggerNotification[],
  ) => void;
  addTriggerNotification: (triggerNotification: TriggerNotification) => void;
  removeTriggerNotification: (id: string) => void;
}

export const createTriggerNotificationsSlice: StateCreator<
  TriggerNotificationsSlice
> = set => ({
  triggerNotifications: [],
  setTriggerNotifications: triggerNotifications =>
    set({ triggerNotifications }),
  addTriggerNotification: triggerNotification =>
    set(state => ({
      triggerNotifications: [
        ...state.triggerNotifications,
        triggerNotification,
      ],
    })),
  removeTriggerNotification: id =>
    set(
      produce(state => {
        state.triggerNotifications = state.triggerNotifications.filter(
          ({ notification }: TriggerNotification) => notification?.id !== id,
        );
      }),
    ),
});
