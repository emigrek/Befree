import { useEffect, useMemo, useState } from 'react';

import { addictionsRef } from '@/services/refs/addictions';
import { useAuthStore, useGlobalStore } from '@/store';
import { getSortingFunction } from '@/store/addictions';

export const useAddictions = () => {
  const user = useAuthStore(state => state.user);
  const { addictions, setAddictions, sorting } = useGlobalStore(state => ({
    addictions: state.addictions,
    setAddictions: state.setAddictions,
    sorting: state.sorting,
  }));
  const [loading, setLoading] = useState(false);

  const sortedAddictions = useMemo(() => {
    return [...addictions]
      .filter(addiction => !addiction.hidden)
      .sort(getSortingFunction(sorting));
  }, [addictions, sorting]);

  const sortedHiddenAddictions = useMemo(() => {
    return [...addictions]
      .filter(addiction => addiction.hidden)
      .sort(getSortingFunction(sorting));
  }, [addictions, sorting]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    return addictionsRef(user.uid).onSnapshot(snapshot => {
      const newAddictions = snapshot.docs.map(doc => {
        const data = doc.data();
        const relapses = data.relapses.map(
          (relapse: any) => new Date(relapse.toDate()),
        );

        return {
          id: doc.id,
          relapses,
          lastRelapse: new Date(data.lastRelapse.toDate()),
          name: data.name,
          image: data.image,
          tags: data.tags,
          hidden: data.hidden,
          createdAt: data.createdAt
            ? new Date(data.createdAt.toDate())
            : new Date(),
        };
      });
      setAddictions(newAddictions);
      setLoading(false);
    });
  }, [setAddictions, sorting.direction, sorting.field, user]);

  return { addictions, sortedAddictions, sortedHiddenAddictions, loading };
};
