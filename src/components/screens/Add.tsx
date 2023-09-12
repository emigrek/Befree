import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';
import { AddScreenProps } from '@/navigation/types';

const Add: FC<AddScreenProps> = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <Screen style={style.screen}>
      <Button onPress={handleClose}>{i18n.t(['labels', 'close'])}</Button>
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
