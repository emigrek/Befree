import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { userRef } from '@/services/refs/user';

export interface CreateUserProps {
  user: FirebaseAuthTypes.User;
}

export const createUser = ({ user }: CreateUserProps) => {
  const { uid, displayName, email, photoURL } = user;

  const fUser = {
    id: uid,
    name: displayName,
    email,
    photoURL,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  return userRef(uid).set(fUser);
};
