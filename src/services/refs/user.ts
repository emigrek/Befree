import firestore from '@react-native-firebase/firestore';

export const userRef = (userId: string) => {
  return firestore().doc(`users/${userId}`);
};
