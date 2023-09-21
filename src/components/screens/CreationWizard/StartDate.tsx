import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
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
      <View style={style.texts}>
        <Text variant="displaySmall">Start date</Text>
      </View>
      <View style={style.floating}>
        <Button onPress={back}>Back</Button>
        <Button mode="contained" onPress={next}>
          Next
        </Button>
      </View>
    </Screen>
  );
};

export { StartDate };
