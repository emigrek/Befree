import { User, UserCredential } from 'firebase/auth';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';
import { useEffect, useState } from 'react';

import { uploadImage } from './storage';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export const firestore = getFirestore();

export const createUser = async (credential: UserCredential) => {
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

export const createAddiction = async (
  user: User,
  addiction: UnidentifiedAddiction,
) => {
  const { uid } = user;
  const { name, startDate, image, tags } = addiction;
  const addictionId = nanoid();

  if (!image) {
    const fAddiction = {
      id: addictionId,
      name,
      startDate,
      image,
      tags,
      createdAt: serverTimestamp(),
    };

    return setDoc(
      doc(firestore, 'users', uid, 'addictions', fAddiction.id),
      fAddiction,
    );
  }

  const imageDownloadUrl = await uploadImage(
    `users/${uid}/addictions/${addictionId}.jpg`,
    image,
  );

  const fAddiction = {
    id: addictionId,
    name,
    startDate,
    image: imageDownloadUrl,
    tags,
    createdAt: serverTimestamp(),
  };

  return setDoc(
    doc(firestore, 'users', uid, 'addictions', fAddiction.id),
    fAddiction,
  );
};

export const useAddictions = (user: User | null) => {
  const [addictions, setAddictions] = useState<Addiction[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const q = query(collection(firestore, 'users', user.uid, 'addictions'));
    return onSnapshot(q, snapshot => {
      const newAddictions: Addiction[] = [];

      snapshot.forEach(addiction => {
        // type-coverage:ignore-next-line
        const { id, name, startDate, image, tags } = addiction.data();
        newAddictions.push({
          id,
          name,
          startDate: startDate.toDate(),
          image,
          tags,
        });
      });

      setAddictions(newAddictions);
    });
  }, [user]);

  return { addictions };
};
