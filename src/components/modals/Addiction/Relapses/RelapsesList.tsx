import { FC, useMemo } from 'react';

import { RelapsesSectionList } from './RelapsesSectionList';

import { useCategorizedRelapses } from '@/hooks/relapse';

interface RelapsesListProps {
  addiction: Addiction;
}

const RelapsesList: FC<RelapsesListProps> = ({ addiction }) => {
  const startAtRelapse: Relapse = useMemo(
    () => ({
      relapseAt: new Date(addiction.startedAt),
      note: '',
      addictionId: addiction.id,
      createdAt: new Date(addiction.startedAt),
      id: 'startedAt',
    }),
    [addiction],
  );
  const relapses = useMemo(
    () => [...addiction.relapses, startAtRelapse],
    [addiction.relapses, startAtRelapse],
  );
  const sections = useCategorizedRelapses(relapses);

  return <RelapsesSectionList addiction={addiction} sections={sections} />;
};

export { RelapsesList };
