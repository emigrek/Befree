import { format, set } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import style from './style';

import { Screen } from '@/components/ui/Screen';
import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useCreationWizardStore } from '@/store';

const StartDate = () => {
  const { startDate, setStartDate } = useCreationWizardStore(state => ({
    startDate: state.startDate,
    setStartDate: state.setStartDate,
  }));

  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  const onTimeModalDismiss = useCallback(() => {
    setTimeModalVisible(false);
  }, []);

  const onTimeModalConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setStartDate(set(startDate, { hours, minutes }));
      setTimeModalVisible(false);
      setDateModalVisible(true);
    },
    [setStartDate, startDate],
  );

  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);

  const onDateModalDismiss = useCallback(() => {
    setDateModalVisible(false);
  }, []);

  const onDateModalConfirm = useCallback(
    ({ date }: { date: Date | undefined }) => {
      if (date) {
        setStartDate(
          set(startDate, {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
          }),
        );
      }
      setDateModalVisible(false);
    },
    [setStartDate, startDate],
  );

  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.texts}>
          <Bold variant="displaySmall" style={style.texts}>
            {i18n.t(['screens', 'creationWizard', 'startDate', 'title'])}
          </Bold>
          <Subtitle variant="bodyMedium" style={style.texts}>
            {i18n.t(['screens', 'creationWizard', 'startDate', 'description'])}
          </Subtitle>
        </View>
        <View style={style.details}>
          <Button
            contentStyle={{ height: 52 }}
            mode="contained-tonal"
            labelStyle={{ fontSize: 16 }}
            onPress={() => setTimeModalVisible(true)}
          >
            {format(startDate, 'HH:mm dd/MM/yyyy')}
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
