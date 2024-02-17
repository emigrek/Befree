import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { ModalStackNavigationProp, RelapseRouteProp } from '@/navigation/types';

const RelapseEditAction = () => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const route = useRoute<RelapseRouteProp>();

  const handleNavigate = () => {
    navigation.navigate({
      name: 'RelapseEdit',
      params: {
        addictionId: route.params.addictionId,
        relapseId: route.params.relapseId,
      },
    });
  };

  return (
    <Appbar.Action
      style={style.action}
      icon={'pencil'}
      onPress={handleNavigate}
    />
  );
};

const style = StyleSheet.create({
  action: {
    margin: 0,
  },
});

export { RelapseEditAction };
