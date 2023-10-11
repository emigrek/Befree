import { FC, useMemo } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { formatAbsenceTime } from '@/utils/formatAbsenceTime';

interface AbsenceIndicatorProps extends Omit<TextProps<string>, 'children'> {
  absenceTime: number;
}

const AbsenceIndicator: FC<AbsenceIndicatorProps> = ({
  absenceTime,
  ...props
}) => {
  const formatted = useMemo(() => {
    return formatAbsenceTime({ absenceTime });
  }, [absenceTime]);

  return <Bold {...props}>{formatted}</Bold>;
};

export { AbsenceIndicator };
