import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';

const Image = () => {
  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.texts}>
          <Text variant="displaySmall">
            {i18n.t(['screens', 'creationWizard', 'image', 'title'])}
          </Text>
          <Subtitle variant="bodyMedium">
            {i18n.t(['screens', 'creationWizard', 'image', 'description'])}
          </Subtitle>
        </View>
      </View>
    </Screen>
  );
};

export { Image };
