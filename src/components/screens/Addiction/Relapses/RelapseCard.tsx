import { format, formatDistanceToNow } from 'date-fns';
import { FC, useCallback } from 'react';
import { Card, Chip } from 'react-native-paper';

import { useRelapseCardChips } from './useRelapseCardChips';

import { useSelectedRelapses } from '@/hooks/selection/useSelectedRelapses';
import { useTheme } from '@/theme';
import { capitalizeFirstLetter } from '@/utils';

interface RelapseCardProps {
  relapse: Relapse;
  addiction: Addiction;
}

const RelapseCard: FC<RelapseCardProps> = ({ relapse, addiction }) => {
  const { colors } = useTheme();
  const chips = useRelapseCardChips({ relapse, addiction });
  const { selected, isSelected, toggleSelected } = useSelectedRelapses({
    id: relapse.id,
  });

  const title = capitalizeFirstLetter(
    formatDistanceToNow(new Date(relapse.relapseAt), {
      addSuffix: true,
    }),
  );
  const subtitle = format(new Date(relapse.relapseAt), 'PPPpp');
  const startedAtRelapse = relapse.id === 'startedAt';

  const handlePress = useCallback(() => {
    if (selected.length && !startedAtRelapse) {
      toggleSelected();
    }

    // Navigate to...
  }, [selected, toggleSelected, startedAtRelapse]);

  const handleLongPress = useCallback(() => {
    if (selected.length || startedAtRelapse) return;

    toggleSelected();
  }, [toggleSelected, selected, startedAtRelapse]);

  return (
    <Card
      onPress={handlePress}
      onLongPress={handleLongPress}
      mode={isSelected ? 'contained' : 'elevated'}
    >
      <Card.Title
        title={title}
        subtitle={subtitle}
        subtitleVariant="bodySmall"
        subtitleStyle={{
          color: colors.outline,
        }}
      />
      {Boolean(chips.length) && (
        <Card.Content style={{ flexDirection: 'row', gap: 5 }}>
          {chips.map((chip, index) => (
            <Chip key={index} icon={chip.icon}>
              {chip.label}
            </Chip>
          ))}
        </Card.Content>
      )}
    </Card>
  );
};

export { RelapseCard };
