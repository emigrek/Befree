import { UserCredential } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

export const firestore = getFirestore();

export const createUser = async (credential: UserCredential) => {
  const { user } = credential;
  const { uid, displayName, email, photoURL } = user;

  setDoc(doc(firestore, 'users', uid), {
    id: uid,
    name: displayName,
    email,
    photoURL,
    createdAt: serverTimestamp(),
  });
};
