import { format, isAfter, set } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useAddictionCreatorStore } from '@/store';

const StartDate = () => {
  const { startDate, setStartDate } = useAddictionCreatorStore(state => ({
    startDate: state.startDate,
    setStartDate: state.setStartDate,
  }));

  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  const onTimeModalDismiss = useCallback(() => {
    setTimeModalVisible(false);
  }, []);

  const onTimeModalConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      const date = set(startDate, { hours, minutes });
      if (isAfter(date, new Date())) {
        return;
      }

      setStartDate(set(startDate, { hours, minutes }));
      setTimeModalVisible(false);
    },
    [setStartDate, startDate],
  );

  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);

  const onDateModalDismiss = useCallback(() => {
    setDateModalVisible(false);
  }, []);

  const onDateModalConfirm = useCallback(
    ({ date }: { date: Date | undefined }) => {
      if (!date) {
        return;
      }

      if (isAfter(date, new Date())) {
        return;
      }

      setStartDate(
        set(startDate, {
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }),
      );
      setDateModalVisible(false);
    },
    [setStartDate, startDate],
  );

  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.textsContainer}>
          <Bold variant="titleLarge" style={style.texts}>
            {i18n.t(['screens', 'addictionCreator', 'startDate', 'title'])}
          </Bold>
          <Subtitle variant="bodyMedium" style={style.texts}>
            {i18n.t([
              'screens',
              'addictionCreator',
              'startDate',
              'description',
            ])}
          </Subtitle>
        </View>
        <View style={style.details}>
          <Text>
            {i18n.t(['screens', 'addictionCreator', 'startDate', 'hour'])}
          </Text>
          <Button
            contentStyle={{ height: 52 }}
            mode="contained-tonal"
            labelStyle={{ fontSize: 17 }}
            onPress={() => setTimeModalVisible(true)}
          >
            {format(startDate, 'HH:mm')}
          </Button>
          <Text>
            {i18n.t(['screens', 'addictionCreator', 'startDate', 'day'])}
          </Text>
          <Button
            contentStyle={{ height: 52 }}
            mode="contained-tonal"
            labelStyle={{ fontSize: 17 }}
            onPress={() => setDateModalVisible(true)}
          >
            {format(startDate, 'dd/MM/yyyy')}
          </Button>
          <TimePickerModal
            hours={startDate.getHours()}
            minutes={startDate.getMinutes()}
            visible={timeModalVisible}
            onConfirm={onTimeModalConfirm}
            onDismiss={onTimeModalDismiss}
          />
          <DatePickerModal
            date={startDate}
            visible={dateModalVisible}
            onConfirm={onDateModalConfirm}
            onDismiss={onDateModalDismiss}
            validRange={{
              startDate: undefined,
              endDate: new Date(),
            }}
            mode="single"
            locale={i18n.locale}
            disableStatusBarPadding={true}
            presentationStyle="overFullScreen"
          />
        </View>
      </View>
    </Screen>
  );
};

export { StartDate };
