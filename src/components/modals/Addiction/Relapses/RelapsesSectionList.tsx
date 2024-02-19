import { FC, useCallback } from 'react';
import { SectionList } from 'react-native';

import { RelapseItem } from './RelapseItem';
import { SectionHeader } from './SectionHeader';

import { RelapsesSection } from '@/hooks/relapse';
import { Addiction, Relapse } from '@/structures';

interface RelapsesSectionListProps {
  addiction: Addiction;
  sections: RelapsesSection[];
}

const RelapsesSectionList: FC<RelapsesSectionListProps> = ({
  sections,
  addiction,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Relapse }) => (
      <RelapseItem relapse={item} addiction={addiction} />
    ),
    [addiction],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: RelapsesSection }) => (
      <SectionHeader title={title} />
    ),
    [],
  );

  return (
    <SectionList
      scrollEnabled={false}
      sections={sections}
      contentContainerStyle={{ gap: 6, marginBottom: 2 }}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export { RelapsesSectionList };
