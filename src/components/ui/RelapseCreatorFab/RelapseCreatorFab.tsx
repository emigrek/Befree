import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';

import { FAB } from '../FAB';

import { AddictionStackRouteProp } from '@/navigation/types';
import RelapseManager from '@/services/data/managers/relapse';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

const RelapseCreatorFab = () => {
  const route = useRoute<AddictionStackRouteProp>();
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();

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
      color={colors.onPrimary}
      onPress={handleRelapse}
      style={{
        backgroundColor: colors.primary,
        position: 'absolute',
        right: 25,
        bottom: 25,
      }}
    />
  );
};

export { RelapseCreatorFab };
