import notifee, {
  AuthorizationStatus,
  NotificationSettings,
} from '@notifee/react-native';
import { useCallback, useEffect, useState } from 'react';

export const useNotificationsSettings = () => {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);

  const requestAuthorization = useCallback(async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      setNotificationSettings(settings);
      return settings;
    } else {
      console.warn('User declined notification permissions.');
    }
  }, [setNotificationSettings]);

  const refresh = useCallback(async () => {
    const settings = await notifee.getNotificationSettings();
    setNotificationSettings(settings);
  }, [setNotificationSettings]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { notificationSettings, requestAuthorization, refresh };
};
