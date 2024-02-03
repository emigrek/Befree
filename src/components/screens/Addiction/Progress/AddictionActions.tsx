import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import UserData from '@/services/data/userData';
import { useAuthStore, useGlobalStore } from '@/store';

interface AddictionActionsProps {
  addiction: Addiction;
}

const AddictionActions: FC<AddictionActionsProps> = ({ addiction }) => {
  const user = useAuthStore(state => state.user);
  const { isBlacklisted: hasNotificationsBlacklisted } = useGlobalStore(
    state => ({
      storeAddAddiction: state.addAddiction,
      storeRemoveAddiction: state.removeAddiction,
      isBlacklisted: state.isBlacklisted,
      removeBlacklist: state.removeBlacklist,
    }),
  );

  const [isRelapsing, setIsRelapsing] = useState(false);

  const handleRelapse = useCallback(() => {
    if (!user) return;
    setIsRelapsing(true);
    const { relapses } = new UserData(user.uid);

    relapses
      .create({
        addictionId: addiction.id,
        relapseAt: new Date(),
      })
      .then(() => {
        setIsRelapsing(false);

        if (!hasNotificationsBlacklisted(addiction.id)) {
          removeAllNotifications({ addictionId: addiction.id });
          addAllNotifications({ addiction });
        }
      });
  }, [user, addiction, hasNotificationsBlacklisted]);

  return (
    <View style={style.buttonContainer}>
      <Button
        mode="contained"
        icon="restart"
        onPress={handleRelapse}
        loading={isRelapsing}
      >
        {i18n.t(['labels', 'relapse'])}
      </Button>
    </View>
  );
};

export { AddictionActions };

const style = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
