import { Duration, formatDuration } from 'date-fns';
import { FC, useMemo } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';

interface CountUpProps extends Omit<TextProps<string>, 'children'> {
  duration: Duration;
}

const CountUp: FC<CountUpProps> = ({ duration, ...props }) => {
  const formattedDuration = useMemo(() => {
    const formatDistanceLocale = {
      lessThanXSeconds: '{{count}}s',
      xSeconds: '{{count}}s',
      halfAMinute: '30s',
      lessThanXMinutes: '{{count}}m',
      xMinutes: '{{count}}m',
      aboutXHours: '{{count}}h',
      xHours: '{{count}}h',
      xDays: '{{count}}d',
      aboutXWeeks: '{{count}}w',
      xWeeks: '{{count}}w',
      aboutXMonths: '{{count}}m',
      xMonths: '{{count}}m',
      aboutXYears: '{{count}}y',
      xYears: '{{count}}y',
      overXYears: '{{count}}y',
      almostXYears: '{{count}}y',
    };

    const formatDistanceShortenLocale = (
      token: keyof typeof formatDistanceLocale,
      count: string,
    ) => {
      return formatDistanceLocale[token].replace('{{count}}', count);
    };

    const defaultFormatDurationOptions = {
      locale: {
        formatDistance: formatDistanceShortenLocale,
      },
    };

    return formatDuration(duration, defaultFormatDurationOptions);
  }, [duration]);

  return (
    <Bold numberOfLines={1} adjustsFontSizeToFit {...props}>
      {formattedDuration}
    </Bold>
  );
};

export { CountUp };
