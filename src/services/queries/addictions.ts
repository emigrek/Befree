import { User } from 'firebase/auth';
import {
  deleteDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { addictionRef } from '@/services/refs';

export interface CreateAddictionProps {
  user: User;
  addiction: Addiction;
}

export const createAddiction = ({ user, addiction }: CreateAddictionProps) => {
  const fAddiction = {
    ...addiction,
    createdAt: serverTimestamp(),
  };

  return setDoc(addictionRef(user.uid, fAddiction.id), fAddiction);
};

export interface RemoveAddictionProps {
  user: User;
  id: string;
}

export const removeAddiction = ({ user, id }: RemoveAddictionProps) => {
  return deleteDoc(addictionRef(user.uid, id));
};

export interface EditAddictionProps {
  user: User;
  id: string;
  addiction: UnidentifiedAddiction;
}

export const editAddiction = ({ user, id, addiction }: EditAddictionProps) => {
  return updateDoc(addictionRef(user.uid, id), addiction);
};

export interface RelapseAddictionProps {
  user: User;
  addiction: Addiction;
}

export const relapseAddiction = ({
  user,
  addiction,
}: RelapseAddictionProps) => {
  const { id, relapses } = addiction;

  const newRelapses = [...relapses, new Date()];

  return updateDoc(addictionRef(user.uid, id), {
    relapses: newRelapses,
  });
};
