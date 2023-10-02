import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { app } from './firebase';
export const storage = getStorage(app);

export const uploadImage = async (
  path: string,
  uri: string,
): Promise<string> => {
  const pathResponse = await fetch(uri);
  const pathBlob = await pathResponse.blob();
  const imageRef = ref(storage, path);

  const snapshot = await uploadBytes(imageRef, pathBlob, {
    contentType: 'image/jpeg',
  });

  const url = await getDownloadURL(snapshot.ref);

  return url;
};
