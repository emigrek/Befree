import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Appbar } from 'react-native-paper';

import { ModalStackNavigationProp } from '@/navigation/types';

const HiddenAddictionsAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleActionPress = () => {
    navigation.navigate('HiddenAddictions', {
      screen: 'Addictions',
    });
  };

  return (
    <Appbar.Action
      icon={'shield-lock'}
      mode={'contained'}
      onPress={handleActionPress}
    />
  );
};

export { HiddenAddictionsAction };
