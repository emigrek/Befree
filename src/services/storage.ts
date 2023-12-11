import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import * as Network from 'expo-network';
import { useState } from 'react';

export const useImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [task, setTask] = useState<FirebaseStorageTypes.Task | null>(null);

  const upload = async (path: string, uri: string) => {
    const { isInternetReachable } = await Network.getNetworkStateAsync();

    if (!isInternetReachable) {
      return null;
    }

    const reference = storage().ref(path);
    const task = reference.putFile(uri);

    setTask(task);

    task.on('state_changed', snapshot => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      setUploadProgress(progress);
    });

    return task.then(async task => {
      setUploadProgress(0);
      setTask(null);

      return await reference.getDownloadURL();
    });
  };

  return {
    upload,
    uploadProgress,
    task,
  };
};
