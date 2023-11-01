import { User } from 'firebase/auth';
import {
  deleteDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { deleteImage } from '../storage';

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

export const removeAddiction = async ({ user, id }: RemoveAddictionProps) => {
  try {
    await deleteImage({
      path: `users/${user.uid}/addictions/${id}`,
    });
  } catch (error) {
    console.log("Couldn't delete image. ", error);
  }
  return deleteDoc(addictionRef(user.uid, id));
};

export interface EditAddictionProps {
  user: User;
  id: string;
  addiction: Partial<UnidentifiedAddiction>;
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
  const date = new Date();

  const newRelapses = [...relapses, date];

  return updateDoc(addictionRef(user.uid, id), {
    relapses: newRelapses,
    lastRelapse: date,
  });
};
