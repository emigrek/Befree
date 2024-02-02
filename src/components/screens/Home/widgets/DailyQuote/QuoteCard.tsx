import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Card, HelperText } from 'react-native-paper';

import QuoteManager, { Quote } from '@/services/data/managers/quote';

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const manager = new QuoteManager();

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

  if (error)
    return (
      <Card
        mode={'outlined'}
        style={styles.card}
        contentStyle={styles.cardContainer}
      >
        <HelperText type="error">{error}</HelperText>
      </Card>
    );

  if (isLoading || !quote)
    return (
      <Card
        mode={'outlined'}
        style={styles.card}
        contentStyle={styles.cardContainer}
      >
        <ActivityIndicator />
      </Card>
    );

  return (
    <Card
      mode={'outlined'}
      style={styles.card}
      contentStyle={styles.cardContainer}
    >
      <Card.Title
        title={`„ ${quote.quote} “`}
        subtitle={`~ ${quote.author}`}
        titleVariant="titleLarge"
        subtitleVariant="bodySmall"
        titleNumberOfLines={0}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'right',
  },
});
