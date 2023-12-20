import { Notification } from '@notifee/react-native';

import { Goals } from '@/hooks/goal/types';
import { navigationRef } from '@/navigation/navigationContainerRef';

export const showAchievement = (notification: Notification) => {
  const { data } = notification;

  if (notification.android?.pressAction?.id === 'show-achievement') {
    if (navigationRef.isReady()) {
      navigationRef.current?.navigate('Achievement', {
        addictionId: data?.addictionId as string,
        goalType: data?.goalType as Goals,
      });
    }
  }
};
