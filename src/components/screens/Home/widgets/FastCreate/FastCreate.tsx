import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PresetList } from './PresetList';

import { WidgetHeader } from '@/components/ui/WidgetHeader';
import i18n from '@/i18n';

const FastCreate = () => {
  return (
    <View style={style.container}>
      <WidgetHeader
        title={i18n.t(['widgets', 'fastCreate', 'title'])}
        description={i18n.t(['widgets', 'fastCreate', 'description'])}
      />
      <PresetList />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 15,
  },
});

export { FastCreate };
