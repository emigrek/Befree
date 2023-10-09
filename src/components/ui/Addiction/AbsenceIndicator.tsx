import { FC } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { formatAbsenceTime } from '@/utils/formatAbsenceTime';

interface AbsenceIndicatorProps extends Omit<TextProps<string>, 'children'> {
  addiction: Addiction;
  refresh?: boolean;
}

const AbsenceIndicator: FC<AbsenceIndicatorProps> = ({
  addiction,
  refresh = true,
  ...props
}) => {
  const { absenceTime } = useAbsenceTime({
    addiction,
    refresh,
  });

  return <Bold {...props}>{formatAbsenceTime({ absenceTime })}</Bold>;
};

export { AbsenceIndicator };
