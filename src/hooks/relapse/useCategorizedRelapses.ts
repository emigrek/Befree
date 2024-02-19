import {
  format,
  isSameDay,
  isWithinInterval,
  startOfYear,
  subDays,
} from 'date-fns';
import { useMemo } from 'react';

import i18n from '@/i18n';
import { Relapse } from '@/structures';
import { capitalizeFirstLetter } from '@/utils';

export interface RelapsesSection {
  title: string;
  data: Relapse[];
}

type KeyedSection = Record<string, RelapsesSection>;

const useCategorizedRelapses = (relapses: Relapse[]) => {
  return useMemo(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const last7DaysStart = subDays(today, 7);
    const last30DaysStart = subDays(today, 30);
    const thisYearStart = startOfYear(today);

    const sections: RelapsesSection[] = [
      {
        title: i18n.t([
          'modals',
          'addiction',
          'relapses',
          'list',
          'timeSectionTitles',
          'today',
        ]),
        data: [],
      },
      {
        title: i18n.t([
          'modals',
          'addiction',
          'relapses',
          'list',
          'timeSectionTitles',
          'yesterday',
        ]),
        data: [],
      },
      {
        title: i18n.t([
          'modals',
          'addiction',
          'relapses',
          'list',
          'timeSectionTitles',
          'last7Days',
        ]),
        data: [],
      },
      {
        title: i18n.t([
          'modals',
          'addiction',
          'relapses',
          'list',
          'timeSectionTitles',
          'last30Days',
        ]),
        data: [],
      },
    ];

    const monthlySections: KeyedSection = {};
    const yearlySections: KeyedSection = {};

    const sortedRelapses = [...relapses].sort(
      (a, b) =>
        new Date(a.relapseAt).getTime() - new Date(b.relapseAt).getTime(),
    );

    for (const relapse of sortedRelapses) {
      const relapseDate = new Date(relapse.relapseAt);

      if (isSameDay(relapseDate, today)) {
        sections[0].data.push(relapse);
      } else if (isSameDay(relapseDate, yesterday)) {
        sections[1].data.push(relapse);
      } else if (
        isWithinInterval(relapseDate, { start: last7DaysStart, end: today })
      ) {
        sections[2].data.push(relapse);
      } else if (
        isWithinInterval(relapseDate, { start: last30DaysStart, end: today })
      ) {
        sections[3].data.push(relapse);
      } else if (relapseDate >= thisYearStart) {
        const monthYear = capitalizeFirstLetter(format(relapseDate, 'LLLL'));
        monthlySections[monthYear] = monthlySections[monthYear] || {
          title: monthYear,
          data: [],
        };
        monthlySections[monthYear].data.push(relapse);
      } else {
        const year = format(relapseDate, 'yyyy');
        yearlySections[year] = yearlySections[year] || {
          title: year,
          data: [],
        };
        yearlySections[year].data.push(relapse);
      }
    }

    const monthlySectionsArray = Object.values(monthlySections);
    const yearlySectionsArray = Object.values(yearlySections);
    const allSections = [
      ...sections,
      ...monthlySectionsArray,
      ...yearlySectionsArray,
    ];
    return allSections
      .filter(section => section.data.length > 0)
      .map(section => ({
        ...section,
        data: [...section.data].reverse(),
      }));
  }, [relapses]);
};

export { useCategorizedRelapses };
