import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { relapseRef } from '@/services/refs/relapses';

export interface CreateRelapseProps {
  user: FirebaseAuthTypes.User;
  relapse: Relapse;
}

export const createRelapse = ({ user, relapse }: CreateRelapseProps) => {
  const fRelapse = {
    ...relapse,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  return relapseRef(user.uid, relapse.id).set(fRelapse);
};

export interface RemoveRelapseProps {
  user: FirebaseAuthTypes.User;
  id: string;
}

export const removeRelapse = ({ user, id }: RemoveRelapseProps) => {
  return relapseRef(user.uid, id).delete();
};

export interface EditRelapseProps {
  user: FirebaseAuthTypes.User;
  id: string;
  relapse: Partial<UnidentifiedRelapse>;
}

export const editRelapse = ({ user, id, relapse }: EditRelapseProps) => {
  return relapseRef(user.uid, id).update(relapse);
};
