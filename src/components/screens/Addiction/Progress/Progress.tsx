import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AddictionActions } from './AddictionActions';
import { GoalProgress } from './GoalProgress';
import { Timeline } from './Timeline';

import { Loading } from '@/components/screens/Loading';
import { Addiction } from '@/components/ui/Addiction';
import { EditAction } from '@/components/ui/EditAction';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import i18n from '@/i18n';
import {
  ModalStackNavigationProp,
  ProgressScreenProps,
} from '@/navigation/types';

interface ProgressProps {
  addiction: Addiction;
}

const Progress: React.FC<ProgressProps> = ({ addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { absenceTime } = useAbsenceTime({ addiction });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
      headerRight: () => <EditAction />,
    });
  }, [addiction, navigation]);

  return (
    <View style={style.container}>
      <View style={style.imageNameContainer}>
        <Addiction.Image
          image={addiction.image}
          name={addiction.name}
          size={200}
        />
        <View style={style.progress}>
          <Text variant="titleMedium">{i18n.t(['labels', 'freeFor'])}</Text>
          <Addiction.CountUp time={absenceTime} variant={'displaySmall'} />
        </View>
      </View>
      <GoalProgress addiction={addiction} />
      <AddictionActions addiction={addiction} />
      <Timeline addiction={addiction} />
    </View>
  );
};

const ProgressScreen: React.FC<ProgressScreenProps> = ({ route }) => {
  const { id } = route.params;
  const addiction = useAddiction({ id });

  if (!addiction) {
    return <Loading />;
  }

  return <Progress addiction={addiction} />;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 15,
  },
  imageNameContainer: {
    marginTop: 15,
    alignItems: 'center',
    gap: 30,
  },
  progress: {
    alignItems: 'center',
    gap: 5,
  },
});

export { ProgressScreen };
