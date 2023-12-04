import { FC, useMemo } from 'react';
import { TextProps } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { useTheme } from '@/theme';
import { formatAbsenceTime } from '@/utils/formatAbsenceTime';

interface AbsenceIndicatorProps extends Omit<TextProps<string>, 'children'> {
  absenceTime: number;
}

const AbsenceIndicator: FC<AbsenceIndicatorProps> = ({
  absenceTime,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const formatted = useMemo(() => {
    return formatAbsenceTime({ absenceTime });
  }, [absenceTime]);

  return (
    <Bold style={[{ color: colors.primary }, style]} {...props}>
      {formatted}
    </Bold>
  );
};

export { AbsenceIndicator };
