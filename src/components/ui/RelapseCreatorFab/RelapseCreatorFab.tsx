import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { FAB } from 'react-native-paper';

import { AddictionStackRouteProp } from '@/navigation/types';
import RelapseManager from '@/services/data/managers/relapse';
import { useAuthStore } from '@/store';

const RelapseCreatorFab = () => {
  const route = useRoute<AddictionStackRouteProp>();
  const user = useAuthStore(state => state.user);
  const handleRelapse = useCallback(async () => {
    if (!user) return;
    const relapses = new RelapseManager(user.uid);

    await relapses.create({
      addictionId: route.params.id,
      relapseAt: new Date(),
    });
  }, [user, route.params.id]);

  return (
    <FAB
      icon="restart"
      customSize={60}
      onPress={handleRelapse}
      style={{
        position: 'absolute',
        right: 25,
        bottom: 25,
      }}
    />
  );
};

export { RelapseCreatorFab };
