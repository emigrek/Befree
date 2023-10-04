import {
  addDays,
  addMonths,
  addYears,
  differenceInMilliseconds,
} from 'date-fns';
import { User, UserCredential } from 'firebase/auth';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';
import { useEffect, useState } from 'react';

import { useImageUpload } from './storage';

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

export const useAddictionCreator = (user: User | null) => {
  const { upload, imageUploadProgress, imageUploadStatus } = useImageUpload();

  const create = async (addiction: UnidentifiedAddiction) => {
    if (!user) return;

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

    const downloadUrl = await upload(
      `users/${uid}/addictions/${addictionId}`,
      image,
    );

    const fAddiction = {
      id: addictionId,
      name,
      startDate,
      image: downloadUrl,
      tags,
      createdAt: serverTimestamp(),
    };

    return setDoc(
      doc(firestore, 'users', uid, 'addictions', fAddiction.id),
      fAddiction,
    );
  };

  return { create, imageUploadProgress, imageUploadStatus };
};

export const useAddictions = (user: User | null) => {
  const [addictions, setAddictions] = useState<Addiction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const q = query(
      collection(firestore, 'users', user.uid, 'addictions'),
      orderBy('startDate', 'asc'),
    );

    return onSnapshot(q, snapshot => {
      setAddictions(
        snapshot.docs.map(doc => ({
          id: doc.get('id'),
          name: doc.get('name'),
          startDate: doc.get('startDate').toDate(),
          image: doc.get('image'),
          tags: doc.get('tags'),
        })),
      );
      setLoading(false);
    });
  }, [user]);

  return { addictions, loading };
};

export const getGoal = (date: Date) => {
  const timeDiff = differenceInMilliseconds(new Date(), date);
  let goalType: GoalType;

  if (timeDiff < 86400000) {
    goalType = GoalType.Day;
  } else if (timeDiff < 604800000) {
    goalType = GoalType.Week;
  } else if (timeDiff < 2592000000) {
    goalType = GoalType.Month;
  } else if (timeDiff < 15552000000) {
    goalType = GoalType.HalfYear;
  } else {
    goalType = GoalType.Year;
  }

  let goalAt = new Date(date);

  switch (goalType) {
    case GoalType.Day:
      goalAt = addDays(goalAt, 1);
      break;
    case GoalType.Week:
      goalAt = addDays(goalAt, 7);
      break;
    case GoalType.Month:
      goalAt = addMonths(goalAt, 1);
      break;
    case GoalType.HalfYear:
      goalAt = addMonths(goalAt, 6);
      break;
    case GoalType.Year:
      goalAt = addYears(goalAt, 1);
      break;
  }

  return { goalAt, goalType };
};

export enum GoalType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  HalfYear = 'half-year',
  Year = 'year',
}
