import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Preset } from '@/components/ui/Preset';
import i18n from '@/i18n';

const PresetList = () => {
  const presets = Object.values(
    i18n.t(['widgets', 'fastCreate', 'presetNames']),
  ).map(name => ({ name }));

  const renderItem = useCallback(
    ({ item }: { item: { name: string } }) => <Preset {...item} />,
    [],
  );

  return (
    <FlatList
      data={presets}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      style={style.flatlist}
      horizontal
      alwaysBounceHorizontal
    />
  );
};

export const style = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
});

export { PresetList };
