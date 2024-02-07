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
        setQuote(quote ?? undefined);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error)
    return (
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <HelperText type="error">{error}</HelperText>
        </Card.Content>
      </Card>
    );

  if (isLoading || !quote)
    return (
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <ActivityIndicator />
        </Card.Content>
      </Card>
    );

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content>
        <Card.Title
          title={`„ ${quote.quote} “`}
          subtitle={`~ ${quote.author}`}
          titleVariant="titleLarge"
          subtitleVariant="bodyMedium"
          titleNumberOfLines={0}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
      </Card.Content>
    </Card>
  );
};

export { QuoteCard };

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
  },
  title: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'right',
  },
});
