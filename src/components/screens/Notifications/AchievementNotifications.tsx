import { FC } from 'react';

import { AchievementNotificationsList } from './AchievementNotificationsList';

import { PushNotifications } from '@/components/illustrations';
import { Empty } from '@/components/ui/Empty';
import { useAchievementsNotifications } from '@/hooks/goal';
import i18n from '@/i18n';

interface AchievementNotificationsProps {
  hidden?: boolean;
}

const AchievementNotifications: FC<AchievementNotificationsProps> = ({
  hidden,
}) => {
  const notifications = useAchievementsNotifications({ hidden });

  if (!notifications.length) {
    return (
      <Empty
        illustration={PushNotifications}
        message={i18n.t(['screens', 'notifications', 'empty'])}
      />
    );
  }

  return <AchievementNotificationsList notifications={notifications} />;
};

export { AchievementNotifications };
