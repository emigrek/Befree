import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { useAddictionCreator } from '@/hooks/addiction';
import {
  BottomTabsStackNavigationProp,
  ModalStackNavigationProp,
} from '@/navigation/types';

interface PresetProps {
  name: string;
}

const Preset: FC<PresetProps> = ({ name }) => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const bottomTabsStackNavigation =
    useNavigation<BottomTabsStackNavigationProp>();
  const { create, creating } = useAddictionCreator();

  const handlePress = useCallback(async () => {
    const newAddiction = await create({
      name,
      image: null,
      relapses: [],
      startedAt: new Date(),
      hidden: false,
    });

    if (!newAddiction) return;
    bottomTabsStackNavigation.navigate('Addictions');
  }, [bottomTabsStackNavigation, create, name]);

  const handleLongPress = useCallback(() => {
    modalStackNavigation.navigate('AddictionCreator', {
      name,
      hide: false,
    });
  }, [modalStackNavigation, name]);

  return (
    <Button
      disabled={creating}
      loading={creating}
      onPress={handlePress}
      onLongPress={handleLongPress}
      mode={'contained-tonal'}
      style={style.button}
      contentStyle={style.buttonContent}
      compact
    >
      {name}
    </Button>
  );
};

const style = StyleSheet.create({
  button: {
    marginRight: 6,
  },
  buttonContent: {
    paddingHorizontal: 5,
  },
});

export { Preset };
