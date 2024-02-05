import { format, formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { Card, Chip } from 'react-native-paper';

import { useRelapseCardChips } from './useRelapseCardChips';

import { capitalizeFirstLetter } from '@/utils';

interface RelapseCardProps {
  relapse: Relapse;
  addiction: Addiction;
}

const RelapseCard: FC<RelapseCardProps> = ({ relapse, addiction }) => {
  const chips = useRelapseCardChips({ relapse, addiction });
  const title = capitalizeFirstLetter(
    formatDistanceToNow(new Date(relapse.relapseAt), {
      addSuffix: true,
    }),
  );
  const subtitle = format(new Date(relapse.relapseAt), 'PPPpp');

  return (
    <Card mode="elevated">
      <Card.Title
        title={title}
        subtitle={subtitle}
        subtitleVariant="bodySmall"
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
