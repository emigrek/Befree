import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import { CreationWizardStartDateScreenProps } from '@/navigation/types';

const StartDate: FC<CreationWizardStartDateScreenProps> = ({ navigation }) => {
  const next = () => {
    navigation.navigate('Image');
  };

  const back = () => {
    navigation.navigate('Name');
  };

  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.texts}>
          <Text variant="displaySmall">
            {i18n.t(['screens', 'creationWizard', 'startDate', 'title'])}
          </Text>
          <Subtitle variant="bodyMedium">
            {i18n.t(['screens', 'creationWizard', 'startDate', 'description'])}
          </Subtitle>
        </View>
      </View>
      <View style={style.floating}>
        <Button onPress={back}>{i18n.t(['labels', 'back'])}</Button>
        <Button mode="contained" onPress={next}>
          {i18n.t(['labels', 'next'])}
        </Button>
      </View>
    </Screen>
  );
};

export { StartDate };
