import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import {
  AddictionStackRouteProp,
  ModalStackNavigationProp,
} from '@/navigation/types';

const AddictionEditAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const route = useRoute<AddictionStackRouteProp>();

  const handleBottomSheetOpen = () => {
    navigation.navigate({
      name: 'AddictionEdit',
      params: {
        addictionId: route.params.addictionId,
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

export { AddictionEditAction };
