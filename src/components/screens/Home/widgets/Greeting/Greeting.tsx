import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';

interface GreetingProps {
  name: string;
}

const Greeting: FC<GreetingProps> = ({ name }) => {
  const timeOfDay = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'morning';
    } else if (hour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

  return (
    <Bold
      variant="headlineMedium"
      style={styles.text}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {i18n.t(['widgets', 'greeting', timeOfDay()], {
        name,
      })}
    </Bold>
  );
};

export { Greeting };

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 15,
  },
});
