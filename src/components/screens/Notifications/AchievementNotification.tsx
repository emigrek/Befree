import { TriggerNotification } from '@notifee/react-native';
import { FC, useCallback, useState } from 'react';
import { Switch, Text } from 'react-native-paper';

import { Addiction } from '@/components/ui/Addiction';
import { useNotificationsBlacklisted } from '@/hooks/notification';
import i18n from '@/i18n';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';
import { useTheme } from '@/theme';

interface AchievementNotificationProps {
  addiction: Addiction;
  notifications: TriggerNotification[];
}

const AchievementNotification: FC<AchievementNotificationProps> = ({
  addiction,
  notifications,
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const isBlacklisted = useNotificationsBlacklisted({
    addiction,
  });

  const handleSwitch = useCallback(async () => {
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
    <Addiction>
      <Addiction.Image image={addiction.image} name={addiction.name} />
      <Addiction.Body>
        <Addiction.Name>{addiction.name}</Addiction.Name>
        <Text>
          {i18n.t(['screens', 'notifications', 'notificationsCount'], {
            count: notifications.length,
          })}
        </Text>
      </Addiction.Body>
      <Switch
        value={!isBlacklisted}
        onValueChange={handleSwitch}
        color={colors.primary}
        disabled={loading}
      />
    </Addiction>
  );
};

export { AchievementNotification };
