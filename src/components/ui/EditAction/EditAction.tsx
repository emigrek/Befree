import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import {
  AddictionStackRouteProp,
  ModalStackNavigationProp,
} from '@/navigation/types';

const EditAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const route = useRoute<AddictionStackRouteProp>();

  const handleBottomSheetOpen = () => {
    navigation.navigate({
      name: 'Edit',
      params: {
        id: route.params.id,
      },
    });
  };

  return (
    <Appbar.Action
      style={style.action}
      icon={'pencil'}
      onPress={handleBottomSheetOpen}
    />
  );
};

const style = StyleSheet.create({
  action: {
    margin: 0,
  },
});

export { EditAction };
