import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { useCallback, useEffect } from 'react';

import { useGlobalStore } from '@/store';

export const useNotificationsSettings = () => {
  const { notificationSettings, setNotificationSettings } = useGlobalStore(
    state => ({
      notificationSettings: state.notificationsSettings,
      setNotificationSettings: state.setNotificationsSettings,
    }),
  );

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
