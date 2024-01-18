import React from 'react';
import { Text } from 'react-native-paper';

import i18n from '@/i18n';

const Commitment = () => {
  return (
    <Text variant={'bodyMedium'} style={{ marginLeft: 5 }}>
      {i18n.t(['screens', 'addictions', 'commitment'])}
    </Text>
  );
};

export { Commitment };
