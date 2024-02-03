import notifee, { TriggerNotification } from '@notifee/react-native';
import { useEffect, useState } from 'react';

export const useTriggerNotifications = () => {
  const [triggerNotifications, setTriggerNotifications] = useState<
    TriggerNotification[]
  >([]);

  useEffect(() => {
    (async () => {
      const notifications = await notifee.getTriggerNotifications();
      setTriggerNotifications(notifications);
    })();
  });

  return { triggerNotifications, setTriggerNotifications };
};
