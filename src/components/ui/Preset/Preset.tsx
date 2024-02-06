import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import {
  BottomTabsStackNavigationProp,
  ModalStackNavigationProp,
} from '@/navigation/types';
import AddictionManager from '@/services/data/managers/addiction';
import { useAuthStore } from '@/store';

interface PresetProps {
  name: string;
}

const Preset: FC<PresetProps> = ({ name }) => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const bottomTabsStackNavigation =
    useNavigation<BottomTabsStackNavigationProp>();
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const addictions = new AddictionManager(user.uid);

    const addiction = {
      name,
      relapses: [],
      image: null,
      startedAt: new Date(),
      hidden: false,
    };

    addictions.create(addiction).then(() => {
      setLoading(false);
      bottomTabsStackNavigation.navigate('Addictions');
    });
  }, [bottomTabsStackNavigation, name, user]);

  const handleLongPress = useCallback(() => {
    modalStackNavigation.navigate('AddictionCreator', {
      name,
      hide: false,
    });
  }, [modalStackNavigation, name]);

  return (
    <Button
      disabled={loading}
      loading={loading}
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
