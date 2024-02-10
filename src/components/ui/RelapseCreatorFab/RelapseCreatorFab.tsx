import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { FAB } from 'react-native-paper';

import {
  AddictionStackRouteProp,
  ModalStackNavigationProp,
} from '@/navigation/types';

const RelapseCreatorFab = () => {
  const route = useRoute<AddictionStackRouteProp>();
  const { navigate } = useNavigation<ModalStackNavigationProp>();

  const handleRelaposeCreatorNavigate = useCallback(async () => {
    navigate('RelapseCreator', { addictionId: route.params.addictionId });
  }, [navigate, route.params.addictionId]);

  return (
    <FAB
      variant="secondary"
      icon="restart"
      customSize={60}
      onPress={handleRelaposeCreatorNavigate}
      style={{
        position: 'absolute',
        right: 25,
        bottom: 25,
        zIndex: 1,
      }}
    />
  );
};

export { RelapseCreatorFab };
