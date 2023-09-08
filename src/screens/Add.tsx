import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { AddScreenProps } from '@/navigation/types';

const Add: FC<AddScreenProps> = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <Screen style={style.screen}>
      <Text>Add</Text>
      <Button onPress={handleClose}>Close</Button>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Add };
