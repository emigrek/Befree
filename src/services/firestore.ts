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
  deleteDoc,
  doc,
  getDoc,
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
import { useElapsedTime } from 'use-elapsed-time';

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

export interface GetAddictionProps {
  user: User;
  id: string;
}

export const getAddiction = async ({ user, id }: GetAddictionProps) => {
  const docRef = doc(firestore, 'users', user.uid, 'addictions', id);

  return getDoc(docRef).then(doc => {
    if (!doc.exists()) return null;

    const { relapses, name, image, tags } = doc.data();

    return {
      id: doc.id,
      relapses: relapses.map((relapse: Timestamp) => relapse.toDate()),
      name,
      image,
      tags,
    };
  });
};

export interface EditProps {
  user: User;
  id: string;
  newAddiction: UnidentifiedAddiction;
}

export const edit = ({ user, id, newAddiction }: EditProps) => {
  const addictionRef = doc(firestore, 'users', user.uid, 'addictions', id);

  return updateDoc(addictionRef, newAddiction);
};

export interface RemoveProps {
  user: User;
  id: string;
}

export const remove = ({ user, id }: RemoveProps) => {
  const addictionRef = doc(firestore, 'users', user.uid, 'addictions', id);

  return deleteDoc(addictionRef);
};

export interface RelapseProps {
  user: User;
  id: string;
}

export const relapse = async ({ user, id }: RelapseProps) => {
  const addiction = await getAddiction({ user, id });

  if (!addiction) return;

  const { relapses } = addiction;

  const newRelapses = [...relapses, new Date()];

  await edit({
    user,
    id,
    newAddiction: { ...addiction, relapses: newRelapses },
  });
};

export const useLastRelapse = (addiction: Addiction) => {
  return useMemo(() => {
    const { relapses } = addiction;
    const lastRelapse = relapses[relapses.length - 1];

    return lastRelapse;
  }, [addiction]);
};

export interface UseFreeForProps {
  addiction: Addiction;
  timer?: boolean;
}

export const useFreeFor = ({ addiction, timer = true }: UseFreeForProps) => {
  const lastRelapse = useLastRelapse(addiction);
  const [freeForTime, setFreeForTime] = useState<number>(
    differenceInMilliseconds(new Date(), lastRelapse),
  );

  useElapsedTime({
    isPlaying: timer,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      const timeDiff = differenceInMilliseconds(new Date(), lastRelapse);
      setFreeForTime(timeDiff);
    }, [lastRelapse]),
  });

  return { freeForTime };
};

export const useAddiction = (id: string) => {
  const user = useAuthStore(state => state.user);
  const [addiction, setAddiction] = useState<Addiction | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    getAddiction({ user, id }).then(addiction => {
      if (!addiction) return;

      setAddiction(addiction);
      setLoading(false);
    });
  }, [user, id]);

  return { addiction, loading };
};
