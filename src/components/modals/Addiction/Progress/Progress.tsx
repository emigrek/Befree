import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { GoalProgress } from './GoalProgress';

import { LoadingScreen } from '@/components/screens';
import { Addiction } from '@/components/ui/Addiction';
import { AddictionEditAction } from '@/components/ui/AddictionEditAction';
import { RelapseCreatorFab } from '@/components/ui/RelapseCreatorFab';
import { useAbstinenceDuration, useAddiction } from '@/hooks/addiction';
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
  const { duration } = useAbstinenceDuration({ addiction });
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
      headerRight: () => <AddictionEditAction />,
    });
  }, [addiction, navigation]);

  return (
    <>
      <View style={[style.container, { marginBottom: headerHeight }]}>
        <View style={style.imageNameContainer}>
          <Addiction.Image
            image={addiction.image}
            name={addiction.name}
            size={200}
          />
          <View style={style.progress}>
            <Text variant="titleMedium">{i18n.t(['labels', 'freeFor'])}</Text>
            <Addiction.CountUp duration={duration} variant={'displaySmall'} />
          </View>
        </View>
        <GoalProgress addiction={addiction} />
      </View>
      <RelapseCreatorFab />
    </>
  );
};

const ProgressScreen: React.FC<ProgressScreenProps> = ({ route }) => {
  const { addictionId } = route.params;
  const addiction = useAddiction({ id: addictionId });

  if (!addiction) {
    return <LoadingScreen />;
  }

  return <Progress addiction={addiction} />;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
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
