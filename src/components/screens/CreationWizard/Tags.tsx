import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import {
  CreationWizardTagsScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';

const Tags: FC<CreationWizardTagsScreenProps> = ({ navigation }) => {
  const { navigate } = useNavigation<ModalStackNavigationProp>();

  const next = () => {
    navigate('BottomTabs', {
      screen: 'Addictions',
    });
  };

  const back = () => {
    navigation.navigate('Image');
  };

  return (
    <Screen style={style.screen}>
      <View style={style.texts}>
        <Text variant="displaySmall">Tags</Text>
      </View>
      <View style={style.floating}>
        <Button onPress={back}>Back</Button>
        <Button mode="contained" onPress={next}>
          Add
        </Button>
      </View>
    </Screen>
  );
};

export { Tags };
