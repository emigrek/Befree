import { useNavigation } from '@react-navigation/native';
import { FC, useLayoutEffect } from 'react';
import { View } from 'react-native';

import { Loading } from '@/components/screens/Loading';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import {
  ModalStackNavigationProp,
  NotificationsScreenProps,
} from '@/navigation/types';

interface NotificationsProps {
  addiction: Addiction;
}

const Notifications: FC<NotificationsProps> = ({ addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  return <View />;
};

const NotificationsScreen: FC<NotificationsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const addiction = useAddiction({ id });

  if (!addiction) {
    return <Loading />;
  }

  return <Notifications addiction={addiction} />;
};

export { NotificationsScreen };
