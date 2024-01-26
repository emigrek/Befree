import firestore from '@react-native-firebase/firestore';

export const addictionRelapsesRef = (userId: string, addictionId: string) => {
  return firestore()
    .collection(`users/${userId}/relapses`)
    .where('addictionId', '==', addictionId);
};

export const relapsesRef = (userId: string) => {
  return firestore().collection(`users/${userId}/relapses`);
};

export const relapseRef = (userId: string, relapseId: string) => {
  return firestore().doc(`users/${userId}/relapses/${relapseId}`);
};
