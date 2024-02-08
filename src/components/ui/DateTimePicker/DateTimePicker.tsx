import { format, isAfter, set } from 'date-fns';
import React, { FC, useCallback, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

import i18n from '@/i18n';

interface DateTimePickerProps extends ViewProps {
  date: Date;
  setDate: (date: Date) => void;
  dateValidRange?: {
    startDate?: Date;
    endDate?: Date;
    disabledDates?: Date[];
  };
  disabled?: boolean;
}

const DateTimePicker: FC<DateTimePickerProps> = ({
  date,
  setDate,
  dateValidRange,
  disabled,
  ...props
}) => {
  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);

  const onTimeModalConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      const d = set(date, { hours, minutes });
      if (isAfter(d, new Date())) {
        return;
      }

      setDate(d);
      setTimeModalVisible(false);
    },
    [setDate, date],
  );

  const onDateModalConfirm = useCallback(
    (d: Date | undefined) => {
      if (!d) {
        return;
      }

      if (isAfter(d, new Date())) {
        return;
      }

      setDate(
        set(date, {
          date: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
        }),
      );
    },
    [setDate, date],
  );

  const onTimeModalDismiss = useCallback(() => {
    setTimeModalVisible(false);
  }, []);

  return (
    <>
      <View {...props}>
        <TextInput
          onTouchStart={() => {
            setTimeModalVisible(true);
          }}
          label={i18n.t(['labels', 'hour'])}
          showSoftInputOnFocus={false}
          value={format(date, 'HH:mm')}
          disabled={disabled}
        />
        <DatePickerInput
          label={i18n.t(['labels', 'date'])}
          value={date}
          onChange={onDateModalConfirm}
          locale={i18n.locale}
          inputMode="end"
          validRange={dateValidRange}
          disableStatusBarPadding={true}
          disabled={disabled}
        />
      </View>
      <TimePickerModal
        hours={date.getHours()}
        minutes={date.getMinutes()}
        visible={timeModalVisible}
        onConfirm={onTimeModalConfirm}
        onDismiss={onTimeModalDismiss}
      />
    </>
  );
};

export { DateTimePicker };
