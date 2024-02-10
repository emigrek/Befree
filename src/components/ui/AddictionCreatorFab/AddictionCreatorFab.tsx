import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { FAB } from 'react-native-paper';

import { ModalStackNavigationProp } from '@/navigation/types';

interface AddictionCreatorFabProps {
  hideAddiction?: boolean;
}

const AddictionCreatorFab: FC<AddictionCreatorFabProps> = ({
  hideAddiction = false,
}) => {
  const { navigate } = useNavigation<ModalStackNavigationProp>();

  const handleAddictionCreatorNavigate = useCallback(() => {
    navigate('AddictionCreator', {
      hide: hideAddiction,
    });
  }, [navigate, hideAddiction]);

  return (
    <FAB
      icon="plus"
      customSize={60}
      style={{
        position: 'absolute',
        right: 25,
        bottom: 25,
        zIndex: 1,
      }}
      onPress={handleAddictionCreatorNavigate}
    />
  );
};

export { AddictionCreatorFab };
