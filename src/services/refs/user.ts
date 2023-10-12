import { doc } from 'firebase/firestore';

import { firestore } from '@/services/firestore';

export const userRef = (userId: string) => {
  return doc(firestore, 'users', userId);
};
