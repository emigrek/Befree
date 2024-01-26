import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useMemo } from 'react';

import { addictionRelapsesRef } from '@/services/refs/relapses';

interface UseSortedRelapsesProps {
  user: FirebaseAuthTypes.User;
  addiction: Addiction;
  direction?: 'asc' | 'desc';
}

export const useSortedRelapses = ({
  user,
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps) => {
  return useMemo(async () => {
    return await getSortedRelapses({ user, addiction, direction });
  }, [user, addiction, direction]);
};

export const getSortedRelapses = async ({
  user,
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps) => {
  return addictionRelapsesRef(user.uid, addiction.id)
    .orderBy('createdAt', direction)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          addictionId: data.addictionId,
          createdAt: new Date(data.createdAt.toDate()),
        };
      });
    });
};
