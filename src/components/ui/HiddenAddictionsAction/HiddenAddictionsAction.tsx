import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

import { useLocalAuthenticationHardwareStatus } from '@/hooks/useLocalAuthenticationHardwareStatus';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';

interface HiddenAddictionsActionProps extends Omit<ButtonProps, 'children'> {}

const HiddenAddictionsAction: FC<HiddenAddictionsActionProps> = props => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { hasHardware } = useLocalAuthenticationHardwareStatus();

  const handleActionPress = useCallback(async () => {
    if (!hasHardware) return;
    navigation.navigate('HiddenAddictions', {
      screen: 'Addictions',
    });
  }, [navigation, hasHardware]);

  return (
    <Button disabled={!hasHardware} onPress={handleActionPress} {...props}>
      {i18n.t(['labels', 'hidden'])}
    </Button>
  );
};

export { HiddenAddictionsAction };
