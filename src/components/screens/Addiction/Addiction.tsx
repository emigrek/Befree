import React from 'react';
import { Text, View } from 'react-native';

import { AddictionScreenProps } from '@/navigation/types';

const Addiction: React.FC<AddictionScreenProps> = ({ route }) => {
  const { id } = route.params;

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export { Addiction };
