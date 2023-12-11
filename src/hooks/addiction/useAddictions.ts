import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useMemo, useState } from 'react';

import { addictionsRef } from '@/services/refs/addictions';
import { useGlobalStore } from '@/store';
import { getSortingFunction } from '@/store/addictions';

export interface UseAddictionsProps {
  user: FirebaseAuthTypes.User;
}

export const useAddictions = ({ user }: UseAddictionsProps) => {
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
    if (!user) return;

    setLoading(true);

    return addictionsRef(user.uid).onSnapshot(snapshot => {
      const newAddictions = snapshot.docs.map(doc => {
        const data = doc.data();
        const relapses = data.relapses.map((relapse: any) => relapse.toDate());

        return {
          id: doc.id,
          relapses,
          lastRelapse: data.lastRelapse.toDate(),
          name: data.name,
          image: data.image,
          tags: data.tags,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
        };
      });
      setAddictions(newAddictions);
      setLoading(false);
    });
  }, [setAddictions, sorting.direction, sorting.field, user]);

  return { addictions, sortedAddictions, loading };
};
