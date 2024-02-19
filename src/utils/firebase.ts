import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const firebaseTimestampField = firestore.FieldValue.serverTimestamp();

export const parseFirebaseTimestamp = (
  timestamp: FirebaseFirestoreTypes.Timestamp,
): Date => {
  if (!timestamp) {
    return new Date();
  }
  return new Date(timestamp.toDate());
};
