import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { useAddiction } from '@/hooks/addiction';
import { ModalStackNavigationProp, RelapseRouteProp } from '@/navigation/types';
import { UserDataManager } from '@/services/managers/firebase';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';
import { useAuthStore } from '@/store';

const RelapseDeleteAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const route = useRoute<RelapseRouteProp>();
  const { addictionId, relapseId } = route.params;
  const user = useAuthStore(state => state.user);
  const addiction = useAddiction({ id: addictionId });
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!addiction || !user) return;
    setLoading(true);

    const { relapses, addictions } = new UserDataManager(user.uid);
    await relapses.delete(relapseId);

    const isBlacklisted = await NotificationsBlacklistManager.getInstance().has(
      addiction.id,
    );
    if (!isBlacklisted) {
      const newAddiction = await addictions.get(addiction.id);
      if (newAddiction)
        await new AchievementNotificationsManager(newAddiction).reschedule();
    }

    navigation.goBack();
    setLoading(false);
  }, [addiction, user, relapseId, navigation]);

  return (
    <Appbar.Action
      style={style.action}
      disabled={loading}
      icon={'trash-can'}
      onPress={handleDelete}
    />
  );
};

const style = StyleSheet.create({
  action: {
    margin: 0,
  },
});

export { RelapseDeleteAction };
