import {
  addDays,
  addMonths,
  addYears,
  differenceInMilliseconds,
  differenceInYears,
} from 'date-fns';
import { User, UserCredential } from 'firebase/auth';
import {
  Timestamp,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useImageUpload } from './storage';

import { useAuthStore } from '@/store';

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
    const { name, relapses, image, tags } = addiction;
    const addictionId = nanoid();

    if (!image) {
      const fAddiction = {
        id: addictionId,
        name,
        relapses,
        image,
        tags,
        createdAt: serverTimestamp(),
      };

      return await setDoc(
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
      relapses,
      image: downloadUrl,
      tags,
      createdAt: serverTimestamp(),
    };

    return await setDoc(
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
      orderBy('createdAt', 'desc'),
    );

    return onSnapshot(q, snapshot => {
      setAddictions(
        snapshot.docs.map(doc => ({
          id: doc.id,
          relapses: doc
            .get('relapses')
            .map((relapse: Timestamp) => relapse.toDate()),
          name: doc.get('name'),
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
      goalAt = addYears(goalAt, differenceInYears(new Date(), date) + 1);
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

export const useAddiction = (addiction: Addiction) => {
  const user = useAuthStore(state => state.user);

  const lastRelapse = useMemo(() => {
    const { relapses } = addiction;
    const lastRelapse = relapses[relapses.length - 1];

    return lastRelapse;
  }, [addiction]);

  const edit = (a: UnidentifiedAddiction) => {
    if (!user) return;

    const addictionRef = doc(
      firestore,
      'users',
      user.uid,
      'addictions',
      addiction.id,
    );

    return updateDoc(addictionRef, a);
  };

  const relapse = () => {
    const { relapses } = addiction;
    const newRelapses = [...relapses, new Date()];

    return edit({ ...addiction, relapses: newRelapses });
  };

  const freeFor = useCallback(() => {
    const now = new Date();
    const diff = now.getTime() - lastRelapse.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) - years * 365);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const y = years ? `${years}y ` : '';
    const d = days ? `${days}d ` : '';
    const h = hours ? `${hours}h ` : '';
    const m = minutes ? `${minutes}m ` : '';
    const s = `${seconds}s`;

    return `${y}${d}${h}${m}${s}`;
  }, [lastRelapse]);

  return { edit, lastRelapse, freeFor, relapse };
};
