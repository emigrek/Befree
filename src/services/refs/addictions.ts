import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from 'firebase/firestore';

import { firestore } from '@/services/firestore';

export const addictionsRef = (userId: string) => {
  return collection(
    firestore,
    'users',
    userId,
    'addictions',
  ) as CollectionReference<Addiction>;
};

export const addictionRef = (userId: string, addictionId: string) => {
  return doc(
    firestore,
    'users',
    userId,
    'addictions',
    addictionId,
  ) as DocumentReference<Addiction>;
};
