import { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { useNotificationsBlacklisted } from '@/hooks/notification';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';

interface AchievementNotificationsActionProps {
  addiction: Addiction;
}

const AchievementNotificationsAction: FC<
  AchievementNotificationsActionProps
> = ({ addiction }) => {
  const isBlacklisted = useNotificationsBlacklisted({
    addiction,
  });
  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(async () => {
    setLoading(true);

    if (isBlacklisted) {
      await NotificationsBlacklistManager.getInstance().remove(addiction.id);
      await new AchievementNotificationsManager(addiction).scheduleAll();
    } else {
      await NotificationsBlacklistManager.getInstance().add(addiction.id);
      await new AchievementNotificationsManager(addiction).cancelAll();
    }

    setLoading(false);
  }, [addiction, isBlacklisted]);

  return (
    <Appbar.Action
      style={style.action}
      disabled={loading}
      icon={!isBlacklisted ? 'bell-check' : 'bell-sleep'}
      onPress={handlePress}
    />
  );
};

const style = StyleSheet.create({
  action: {
    margin: 0,
  },
});

export { AchievementNotificationsAction };
