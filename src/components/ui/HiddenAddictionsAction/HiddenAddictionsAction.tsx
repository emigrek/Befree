import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useLocalAuthStore } from '@/store';

interface HiddenAddictionsActionProps extends Omit<ButtonProps, 'children'> {}

const HiddenAddictionsAction: FC<HiddenAddictionsActionProps> = props => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const hasHardware = useLocalAuthStore(state => state.hasHardware);

  const handleActionPress = useCallback(async () => {
    navigation.navigate('HiddenAddictions', {
      screen: 'Addictions',
    });
  }, [navigation]);

  return (
    <Button disabled={!hasHardware} onPress={handleActionPress} {...props}>
      {i18n.t(['labels', 'hidden'])}
    </Button>
  );
};

export { HiddenAddictionsAction };
