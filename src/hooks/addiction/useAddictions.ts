import { User } from 'firebase/auth';
import { Timestamp, collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { firestore } from '@/services/firestore';
import { useGlobalStore } from '@/store';

export interface UseAddictionsProps {
  user: User;
}

export const useAddictions = ({ user }: UseAddictionsProps) => {
  const { addictions, setAddictions, sorting } = useGlobalStore(state => ({
    addictions: state.addictions,
    setAddictions: state.setAddictions,
    sorting: state.sorting,
  }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const q = collection(firestore, 'users', user.uid, 'addictions');

    return onSnapshot(q, snapshot => {
      const newAddictions = snapshot.docs.map(doc => ({
        id: doc.id,
        relapses: doc
          .get('relapses')
          .map((relapse: Timestamp) => relapse.toDate()),
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
  }, [setAddictions, sorting.direction, sorting.field, user.uid]);

  return { addictions, loading };
};
