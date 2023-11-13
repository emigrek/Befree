import { useNavigation } from '@react-navigation/native';
import { sub } from 'date-fns';
import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Loading } from '@/components/screens/Loading';
import {
  AbsenceIndicator,
  GoalProgress,
  Image,
} from '@/components/ui/Addiction';
import { Timeline } from '@/components/ui/Timeline';
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
  const { id, lastRelapse } = addiction;
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();
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
    });
  }, [addiction, navigation]);

  const handleRelapse = useCallback(() => {
    if (!user) return;
    const date = new Date();

    storeAddRelapse(addiction.id, date);
    relapseAddiction({
      user,
      addiction,
    }).catch(() => {
      storeRemoveRelapse(addiction.id, date);
    });
  }, [user, addiction, storeAddRelapse, storeRemoveRelapse]);

  const handleRemove = useCallback(() => {
    if (!user) return;

    navigation.navigate('BottomTabs', { screen: 'Addictions' });

    storeRemove(id);
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
        <Image image={addiction.image} name={addiction.name} size={250} />
        <View style={style.progress}>
          <Text variant="titleMedium">{i18n.t(['labels', 'freeFor'])}</Text>
          <AbsenceIndicator
            absenceTime={absenceTime}
            style={{ fontSize: 40, color: colors.primary }}
          />
          <GoalProgress absenceTime={absenceTime} lastRelapse={lastRelapse} />
        </View>
      </View>
      <View style={style.buttonContainer}>
        <Button
          style={style.button}
          contentStyle={style.buttonContent}
          mode="contained"
          icon="restart"
          onPress={handleRelapse}
        >
          {i18n.t(['labels', 'relapse'])}
        </Button>
        <Button
          style={style.button}
          contentStyle={style.buttonContent}
          mode="contained-tonal"
          icon="trash-can"
          onPress={handleRemove}
        >
          {i18n.t(['labels', 'remove'])}
        </Button>
      </View>
      <Timeline
        range={[sub(new Date(), { years: 1 }), new Date()]}
        cellSize={14}
      >
        <Timeline.Days />
        <Timeline.Body>
          <Timeline.Months />
          <Timeline.Cells />
        </Timeline.Body>
      </Timeline>
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
    gap: 40,
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
