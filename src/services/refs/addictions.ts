import firestore from '@react-native-firebase/firestore';

export const addictionsRef = (userId: string) => {
  return firestore().collection(`users/${userId}/addictions`);
};

export const addictionRef = (userId: string, addictionId: string) => {
  return firestore().doc(`users/${userId}/addictions/${addictionId}`);
};
