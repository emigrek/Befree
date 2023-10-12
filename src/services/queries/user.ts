import { UserCredential } from 'firebase/auth';
import { serverTimestamp, setDoc } from 'firebase/firestore';

import { userRef } from '@/services/refs';

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

  return setDoc(userRef(uid), fUser);
};
