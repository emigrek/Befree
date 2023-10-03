import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';

import { app } from './firebase';
export const storage = getStorage(app);

type ImageUploadStatus = UploadTaskSnapshot | StorageError | 'complete' | null;

export const useImageUpload = () => {
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadStatus, setImageUploadStatus] =
    useState<ImageUploadStatus>(null);

  const onChange = (snapshot: UploadTaskSnapshot) => {
    setImageUploadProgress(snapshot.bytesTransferred / snapshot.totalBytes);
    setImageUploadStatus(snapshot);
  };

  const onError = (error: StorageError) => {
    setImageUploadStatus(error);
  };

  const onComplete = () => {
    setImageUploadStatus('complete');
  };

  const upload = async (path: string, uri: string) => {
    const pathResponse = await fetch(uri);
    const pathBlob = await pathResponse.blob();
    const imageRef = ref(storage, path);

    const task = uploadBytesResumable(imageRef, pathBlob, {
      contentType: 'image/jpeg',
    });

    task.on('state_changed', onChange, onError, onComplete);

    const downloadUrl = await getDownloadURL((await task).ref);

    return downloadUrl;
  };

  return {
    upload,
    imageUploadProgress,
    imageUploadStatus,
  };
};
