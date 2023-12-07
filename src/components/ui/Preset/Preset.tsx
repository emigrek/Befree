import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { useAddictionCreator } from '@/hooks/addiction/useAddictionCreator';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useCreationWizardStore } from '@/store';

interface PresetProps {
  name: string;
}

const Preset: FC<PresetProps> = ({ name }) => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const setName = useCreationWizardStore(state => state.setName);
  const [loading, setLoading] = useState(false);
  const { create } = useAddictionCreator();

  const handlePress = useCallback(async () => {
    setLoading(true);

    const addiction = {
      name,
      relapses: [new Date()],
      lastRelapse: new Date(),
      image: null,
      tags: [],
    };

    create(addiction).then(() => {
      setLoading(false);
    });
  }, [create, name]);

  const handleLongPress = useCallback(() => {
    setName(name);
    modalStackNavigation.navigate('Add');
  }, [modalStackNavigation, setName, name]);

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
