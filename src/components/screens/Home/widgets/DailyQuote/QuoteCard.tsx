import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Card, HelperText } from 'react-native-paper';

import QuoteManger, { Quote } from '@/services/data/managers/quote';

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const manager = new QuoteManger();

    manager
      .getDailyQuote()
      .then(quote => {
        setQuote(quote);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error) return <HelperText type="error">{error}</HelperText>;

  if (isLoading || !quote) return <ActivityIndicator />;

  return (
    <Card
      mode={'outlined'}
      style={styles.card}
      contentStyle={styles.cardContainer}
    >
      <Card.Title
        title={quote.quote}
        subtitle={`~ ${quote.author}`}
        titleVariant="titleMedium"
        subtitleVariant="bodySmall"
        titleNumberOfLines={0}
        titleStyle={styles.title}
      />
    </Card>
  );
};

export { QuoteCard };

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
  },
  cardContainer: {
    padding: 10,
  },
  title: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});
