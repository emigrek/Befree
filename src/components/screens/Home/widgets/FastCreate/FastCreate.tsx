import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { PresetList } from './PresetList';

import i18n from '@/i18n';
import { useTheme } from '@/theme';

const FastCreate = () => {
  const { colors } = useTheme();

  return (
    <View style={style.container}>
      <View style={style.texts}>
        <Text variant="titleLarge">
          {i18n.t(['widgets', 'fastCreate', 'title'])}
        </Text>
        <Text variant="bodySmall" style={[{ color: colors.outline }]}>
          {i18n.t(['widgets', 'fastCreate', 'description'])}
        </Text>
      </View>
      <PresetList />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 15,
  },
  text: {
    paddingHorizontal: 10,
  },
  texts: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
});

export { FastCreate };
