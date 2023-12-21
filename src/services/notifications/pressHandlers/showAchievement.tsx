import { Notification } from '@notifee/react-native';

import { Goals } from '@/hooks/goal/types';
import { modalsNavigationContainerRef as navigation } from '@/navigation/NavigationContainerRef';

export const showAchievement = (notification: Notification) => {
  const { data } = notification;

  if (data && notification.android?.pressAction?.id === 'show-achievement') {
    if (!navigation.isReady()) return;

    navigation.navigate('Achievement', {
      addictionId: data.addictionId as string,
      goalType: data.goalType as Goals,
    });
  }
};
