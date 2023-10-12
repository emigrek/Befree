import { collection, doc } from 'firebase/firestore';

import { firestore } from '@/services/firestore';

export const addictionsRef = (userId: string) => {
  return collection(firestore, 'users', userId, 'addictions');
};

export const addictionRef = (userId: string, addictionId: string) => {
  return doc(firestore, 'users', userId, 'addictions', addictionId);
};
