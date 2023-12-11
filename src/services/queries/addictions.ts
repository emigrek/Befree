import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { addictionImageRef } from '../refs/image';

import { addictionRef } from '@/services/refs/addictions';

export interface CreateAddictionProps {
  user: FirebaseAuthTypes.User;
  addiction: Addiction;
}

export const createAddiction = ({ user, addiction }: CreateAddictionProps) => {
  const fAddiction = {
    ...addiction,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  return addictionRef(user.uid, addiction.id).set(fAddiction);
};

export interface RemoveAddictionProps {
  user: FirebaseAuthTypes.User;
  id: string;
}

export const removeAddiction = async ({ user, id }: RemoveAddictionProps) => {
  try {
    addictionImageRef(user.uid, id).delete();
  } catch (error) {
    console.log('Cant delete image: ', error);
  }
  return addictionRef(user.uid, id).delete();
};

export interface EditAddictionProps {
  user: FirebaseAuthTypes.User;
  id: string;
  addiction: Partial<UnidentifiedAddiction>;
}

export const editAddiction = ({ user, id, addiction }: EditAddictionProps) => {
  return addictionRef(user.uid, id).update(addiction);
};

export interface RelapseAddictionProps {
  user: FirebaseAuthTypes.User;
  addiction: Addiction;
}

export const relapseAddiction = ({
  user,
  addiction,
}: RelapseAddictionProps) => {
  const { id, relapses } = addiction;
  const date = new Date();

  const newRelapses = [...relapses, date];

  return addictionRef(user.uid, id).update({
    relapses: newRelapses,
    lastRelapse: date,
  });
};
