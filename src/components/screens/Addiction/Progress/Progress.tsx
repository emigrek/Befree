import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

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
import { relapseAddiction, removeAddiction } from '@/services/queries';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

interface ProgressProps {
  addiction: Addiction;
}

const Progress: React.FC<ProgressProps> = ({ addiction }) => {
  const { id } = addiction;
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { absenceTime } = useAbsenceTime({ addiction });
  const { storeAddRelapse, storeRemoveRelapse, storeAdd, storeRemove } =
    useGlobalStore(state => ({
      storeAddRelapse: state.addRelapse,
      storeRemoveRelapse: state.removeRelapse,
      storeAdd: state.add,
      storeRemove: state.remove,
    }));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
      headerRight: () => <EditAction />,
    });
  }, [addiction, navigation]);

  const handleRelapse = useCallback(() => {
    const date = new Date();

    storeAddRelapse(addiction.id, date);

    if (!user) return;

    relapseAddiction({
      user,
      addiction,
    }).catch(() => {
      storeRemoveRelapse(addiction.id, date);
    });
  }, [user, addiction, storeAddRelapse, storeRemoveRelapse]);

  const handleRemove = useCallback(() => {
    navigation.navigate('BottomTabs', { screen: 'Addictions' });

    storeRemove(id);

    if (!user) return;

    removeAddiction({
      user,
      id,
    }).catch(() => {
      storeAdd(addiction);
    });
  }, [user, id, storeRemove, storeAdd, addiction, navigation]);

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
      <View style={style.buttonContainer}>
        <Button
          style={style.button}
          contentStyle={[
            style.buttonContent,
            {
              backgroundColor: colors.errorContainer,
            },
          ]}
          labelStyle={{
            color: colors.error,
          }}
          mode="contained-tonal"
          icon="restart"
          onPress={handleRelapse}
        >
          {i18n.t(['labels', 'relapse'])}
        </Button>
        <Button
          style={style.button}
          contentStyle={style.buttonContent}
          mode="text"
          icon="trash-can"
          labelStyle={{
            color: colors.error,
          }}
          onPress={handleRemove}
        >
          {i18n.t(['labels', 'remove'])}
        </Button>
      </View>
      <GoalProgress addiction={addiction} />
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
    gap: 18,
  },
  imageNameContainer: {
    marginTop: 15,
    alignItems: 'center',
    gap: 30,
  },
  button: {
    flex: 1,
  },
  buttonContent: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
  },
  progress: {
    alignItems: 'center',
    gap: 5,
  },
});

export { ProgressScreen };
