import { FC } from 'react';
import { View } from 'react-native';

import { Loading } from '@/components/screens/Loading';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { NotificationsScreenProps } from '@/navigation/types';

interface NotificationsProps {
  addiction: Addiction;
}

const Notifications: FC<NotificationsProps> = ({ addiction }) => {
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
