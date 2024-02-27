import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useLocalAuthStore } from '@/store';

interface HiddenAddictionsActionProps
  extends Omit<ButtonProps, 'children' | 'icon' | 'onPress' | 'disabled'> {}

const HiddenAddictionsAction: FC<HiddenAddictionsActionProps> = props => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { hasHardware, authenticated } = useLocalAuthStore(state => ({
    hasHardware: state.hasHardware,
    authenticated: state.authenticated,
  }));
  const icon = authenticated ? 'shield-lock-open-outline' : 'shield-lock';

  const handleActionPress = useCallback(() => {
    navigation.navigate('HiddenAddictions', {
      screen: 'Addictions',
    });
  }, [navigation]);

  return (
    <Button
      icon={icon}
      disabled={!hasHardware}
      onPress={handleActionPress}
      {...props}
    >
      {i18n.t(['labels', 'hidden'])}
    </Button>
  );
};

export { HiddenAddictionsAction };
