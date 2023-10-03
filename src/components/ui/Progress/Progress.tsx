import {} from 'date-fns';
import React, { useMemo } from 'react';
import { ProgressBar } from 'react-native-paper';

const Progress = ({ startDate }: { startDate: Date }) => {
  const progress = useMemo(() => {
    const today = new Date();
    const start = startDate;

    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;

    return diff / oneDay;
  }, [startDate]);

  return (
    <ProgressBar progress={progress} style={{ height: 10, borderRadius: 4 }} />
  );
};

export { Progress };
