import { FC, useMemo } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { formatTime } from '@/utils/formatTime';

interface CountUpProps extends Omit<TextProps<string>, 'children'> {
  time: number;
  toNow?: boolean;
}

const CountUp: FC<CountUpProps> = ({ time, toNow, ...props }) => {
  const formatted = useMemo(() => {
    return formatTime({ time, toNow });
  }, [time, toNow]);

  return <Bold {...props}>{formatted}</Bold>;
};

export { CountUp };
