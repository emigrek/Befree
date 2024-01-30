import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const parseFirebaseTimestamp = (
  timestamp: FirebaseFirestoreTypes.Timestamp,
): Date => {
  return new Date(timestamp.toDate());
};
