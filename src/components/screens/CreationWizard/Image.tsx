import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { CreationWizardImageScreenProps } from '@/navigation/types';

const Image: FC<CreationWizardImageScreenProps> = ({ navigation }) => {
  const next = () => {
    navigation.navigate('Tags');
  };

  const back = () => {
    navigation.navigate('StartDate');
  };

  return (
    <Screen style={style.screen}>
      <View style={style.texts}>
        <Text variant="displaySmall">Image</Text>
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

export { Image };
