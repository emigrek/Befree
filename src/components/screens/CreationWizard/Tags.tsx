import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
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
      <View style={style.container}>
        <View style={style.texts}>
          <Text variant="displaySmall">
            {i18n.t(['screens', 'creationWizard', 'tags', 'title'])}
          </Text>
          <Subtitle variant="bodyMedium">
            {i18n.t(['screens', 'creationWizard', 'tags', 'description'])}
          </Subtitle>
        </View>
      </View>
      <View style={style.floating}>
        <Button onPress={back}>{i18n.t(['labels', 'back'])}</Button>
        <Button mode="contained" onPress={next}>
          {i18n.t(['labels', 'add'])}
        </Button>
      </View>
    </Screen>
  );
};

export { Tags };
