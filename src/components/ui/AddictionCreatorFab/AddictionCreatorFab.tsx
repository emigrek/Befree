import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';

import { FAB } from '../FAB';

import { ModalStackNavigationProp } from '@/navigation/types';
import { useTheme } from '@/theme';

interface AddictionCreatorFabProps {
  hideAddiction?: boolean;
}

const AddictionCreatorFab: FC<AddictionCreatorFabProps> = ({
  hideAddiction = false,
}) => {
  const { navigate } = useNavigation<ModalStackNavigationProp>();
  const { colors } = useTheme();

  return (
    <FAB
      icon="plus"
      customSize={60}
      color={colors.onPrimary}
      style={{
        backgroundColor: colors.primary,
        position: 'absolute',
        right: 25,
        bottom: 25,
      }}
      onPress={() =>
        navigate('AddictionCreator', {
          hide: hideAddiction,
        })
      }
    />
  );
};

export { AddictionCreatorFab };
