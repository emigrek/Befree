import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';

import QuoteManger, { Quote } from '@/services/data/managers/quote';

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const manager = new QuoteManger();

    manager.getDailyQuote().then(quote => {
      setQuote(quote);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !quote) return <ActivityIndicator />;

  return (
    <Card mode="contained" style={styles.container}>
      <Card.Title
        title={quote.quote}
        subtitle={`~ ${quote.author}`}
        titleVariant="titleMedium"
        titleNumberOfLines={0}
        titleStyle={styles.title}
      />
    </Card>
  );
};

export { QuoteCard };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  title: {
    fontStyle: 'italic',
  },
});
