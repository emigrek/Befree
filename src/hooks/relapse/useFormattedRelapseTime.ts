import { format, formatDistanceToNow } from 'date-fns';

import { capitalizeFirstLetter } from '@/utils';

interface UseFormattedRelapseTimeProps {
  relapse: Relapse;
}

const useFormattedRelapseTime = ({ relapse }: UseFormattedRelapseTimeProps) => {
  const relapseAt = new Date(relapse.relapseAt);
  const toNow = capitalizeFirstLetter(
    formatDistanceToNow(relapseAt, { addSuffix: true }),
  );
  const date = format(relapseAt, 'dd/MM/yyyy');

  return { toNow, date };
};

export { useFormattedRelapseTime };
