import storage from '@react-native-firebase/storage';

export const addictionImageRef = (userId: string, addictionId: string) => {
  return storage().ref(`users/${userId}/addictions/${addictionId}`);
};
