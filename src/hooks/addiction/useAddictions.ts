import { User } from 'firebase/auth';
import { Timestamp, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { addictionsRef } from '@/services/refs/addictions';
import { useGlobalStore } from '@/store';
import { getSortingFunction } from '@/store/addictions';

export interface UseAddictionsProps {
  user: User;
}

export const useAddictions = ({ user }: UseAddictionsProps) => {
  const { uid } = user;
  const { addictions, setAddictions, sorting } = useGlobalStore(state => ({
    addictions: state.addictions,
    setAddictions: state.setAddictions,
    sorting: state.sorting,
  }));
  const [loading, setLoading] = useState(false);

  const sortedAddictions = useMemo(() => {
    return [...addictions].sort(getSortingFunction(sorting));
  }, [addictions, sorting]);

  useEffect(() => {
    setLoading(true);

    return onSnapshot(addictionsRef(uid), snapshot => {
      const newAddictions = snapshot.docs.map(doc => ({
        id: doc.id,
        relapses: doc
          .get('relapses')
          .map((relapse: Timestamp) => relapse.toDate()),
        lastRelapse: doc.get('lastRelapse').toDate(),
        name: doc.get('name'),
        image: doc.get('image'),
        tags: doc.get('tags'),
        createdAt: doc.get('createdAt')
          ? doc.get('createdAt').toDate()
          : new Date(),
      }));

      setAddictions(newAddictions);
      setLoading(false);
    });
  }, [setAddictions, sorting.direction, sorting.field, uid]);

  return { addictions, sortedAddictions, loading };
};
