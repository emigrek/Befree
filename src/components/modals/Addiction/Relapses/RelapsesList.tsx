import { FC } from 'react';

import { RelapsesSectionList } from './RelapsesSectionList';

import { useCategorizedRelapses } from '@/hooks/relapse';
import { Addiction } from '@/structures';

interface RelapsesListProps {
  addiction: Addiction;
}

const RelapsesList: FC<RelapsesListProps> = ({ addiction }) => {
  const sections = useCategorizedRelapses(addiction.relapses);

  return <RelapsesSectionList addiction={addiction} sections={sections} />;
};

export { RelapsesList };
