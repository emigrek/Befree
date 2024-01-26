import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useMemo, useState } from 'react';

import { addictionsRef } from '@/services/refs/addictions';
import { addictionRelapsesRef } from '@/services/refs/relapses';
import { useAuthStore, useGlobalStore } from '@/store';
import { getSortingFunction } from '@/store/addictions';

export const useAddictions = () => {
  const user = useAuthStore(state => state.user);
  const { addictions, relapses, setAddictions, setRelapses, sorting } =
    useGlobalStore(state => ({
      addictions: state.addictions,
      setAddictions: state.setAddictions,
      relapses: state.relapses,
      setRelapses: state.setRelapses,
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

  useEffect(() => {
    if (!user) return;

    async function getRelapses({
      user,
      addiction,
    }: {
      user: FirebaseAuthTypes.User;
      addiction: Addiction;
    }) {
      const relapses = await addictionRelapsesRef(user.uid, addiction.id).get();
      const newRelapses = relapses.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          addictionId: data.addictionId,
          createdAt: new Date(data.createdAt.toDate()),
        };
      });

      setRelapses(newRelapses);
    }

    for (const addiction of addictions) {
      getRelapses({ user, addiction });
    }
  }, [addictions, setRelapses, user]);

  return {
    addictions,
    relapses,
    sortedAddictions,
    sortedHiddenAddictions,
    loading,
  };
};
