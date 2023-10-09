import { User, UserCredential } from 'firebase/auth';
import {
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export const firestore = getFirestore();

export interface CreateUserProps {
  credential: UserCredential;
}

export const createUser = ({ credential }: CreateUserProps) => {
  const { user } = credential;
  const { uid, displayName, email, photoURL } = user;

  const fUser = {
    id: uid,
    name: displayName,
    email,
    photoURL,
    createdAt: serverTimestamp(),
  };

  return setDoc(doc(firestore, 'users', uid), fUser);
};

export interface CreateAddictionProps {
  user: User;
  addiction: Addiction;
}

export const createAddiction = ({ user, addiction }: CreateAddictionProps) => {
  const fAddiction = {
    ...addiction,
    createdAt: serverTimestamp(),
  };

  return setDoc(
    doc(firestore, 'users', user.uid, 'addictions', fAddiction.id),
    fAddiction,
  );
};

export interface RemoveAddictionProps {
  user: User;
  id: string;
}

export const removeAddiction = ({ user, id }: RemoveAddictionProps) => {
  return deleteDoc(doc(firestore, 'users', user.uid, 'addictions', id));
};

export interface EditAddictionProps {
  user: User;
  id: string;
  addiction: UnidentifiedAddiction;
}

export const editAddiction = ({ user, id, addiction }: EditAddictionProps) => {
  return updateDoc(
    doc(firestore, 'users', user.uid, 'addictions', id),
    addiction,
  );
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

  return updateDoc(doc(firestore, 'users', user.uid, 'addictions', id), {
    relapses: newRelapses,
  });
};
