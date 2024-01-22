import { FC } from 'react';

import { AchievementNotificationsList } from './AchievementNotificationsList';

import { Empty } from '@/components/screens/Addictions/Empty';
import { Header } from '@/components/ui/Header';
import { useAchievementsNotifications } from '@/hooks/goal/useAchievementsNotifications';
import i18n from '@/i18n';

interface AchievementNotificationsProps {
  hidden?: boolean;
}

const AchievementNotifications: FC<AchievementNotificationsProps> = ({
  hidden,
}) => {
  const notifications = useAchievementsNotifications({ hidden });

  return (
    <>
      <Header
        title={i18n.t([
          'screens',
          'notifications',
          'achievementsNotifications',
        ])}
      />
      {notifications.length ? (
        <AchievementNotificationsList notifications={notifications} />
      ) : (
        <Empty />
      )}
    </>
  );
};

export { AchievementNotifications };
