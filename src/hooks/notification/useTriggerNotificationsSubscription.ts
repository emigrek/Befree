import { TriggerNotification } from '@notifee/react-native';
import { useCallback, useEffect } from 'react';

import { NotificationsManager } from '@/services/managers/local';
import { useTriggerNotificationsStore } from '@/store';

export const useTriggerNotificationsSubscription = () => {
  const {
    setTriggerNotifications,
    addTriggerNotification,
    removeTriggerNotification,
  } = useTriggerNotificationsStore();

  const init = useCallback(async () => {
    const notifications =
      await NotificationsManager.getInstance().getAllTrigger();
    setTriggerNotifications(notifications);
  }, [setTriggerNotifications]);

  useEffect(() => {
    init();
    const notificationsManager = NotificationsManager.getInstance();

    const createListener = notificationsManager.addListener(
      'create',
      async (notification: TriggerNotification) => {
        addTriggerNotification(notification);
      },
    );

    const cancelListener = notificationsManager.addListener(
      'cancel',
      async (notificationId: string) => {
        removeTriggerNotification(notificationId);
      },
    );

    return () => {
      createListener.remove();
      cancelListener.remove();
    };
  }, [
    addTriggerNotification,
    removeTriggerNotification,
    setTriggerNotifications,
    init,
  ]);
};
