import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Appbar } from 'react-native-paper';

import { ModalStackNavigationProp } from '@/navigation/types';

const HiddenAddictionsAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleActionPress = () => {
    navigation.navigate('HiddenAddictions');
  };

  return (
    <Appbar.Action
      icon={'shield-lock'}
      mode={'contained-tonal'}
      onPress={handleActionPress}
    />
  );
};

export { HiddenAddictionsAction };
