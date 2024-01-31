import React from 'react';
import { StyleSheet, View } from 'react-native';

import { QuoteCard } from './QuoteCard';

import { Header } from '@/components/ui/Header';
import i18n from '@/i18n';

const DailyQuote = () => {
  return (
    <View style={style.container}>
      <Header
        title={i18n.t(['widgets', 'dailyQuote', 'title'])}
        description={i18n.t(['widgets', 'dailyQuote', 'description'])}
      />
      <QuoteCard />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 15,
  },
});

export { DailyQuote };
