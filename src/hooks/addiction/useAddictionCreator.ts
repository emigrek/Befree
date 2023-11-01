import { useNavigation } from '@react-navigation/native';
import { customAlphabet } from 'nanoid/non-secure';
import { useCallback, useState } from 'react';

import { ModalStackNavigationProp } from '@/navigation/types';
import { createAddiction } from '@/services/queries';
import { useImageUpload } from '@/services/storage';
import { useAuthStore, useGlobalStore } from '@/store';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export const useAddictionCreator = () => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const { upload, imageUploadProgress, imageUploadStatus } = useImageUpload();
  const { storeAdd, storeRemove } = useGlobalStore(state => ({
    storeAdd: state.add,
    storeRemove: state.remove,
  }));
  const [creating, setCreating] = useState(false);
  const user = useAuthStore(state => state.user);

  const create = useCallback(
    async (addiction: UnidentifiedAddiction) => {
      if (!user) return;
      setCreating(true);

      const { uid } = user;
      const { name, relapses, lastRelapse, image, tags } = addiction;
      const addictionId = nanoid();

      const imageUrl = image
        ? await upload(`users/${uid}/addictions/${addictionId}`, image)
        : null;

      const newAddiction = {
        id: addictionId,
        name,
        relapses,
        lastRelapse,
        image: imageUrl,
        tags,
        createdAt: new Date(),
      };

      storeAdd(newAddiction);
      modalStackNavigation.navigate('BottomTabs', {
        screen: 'Addictions',
      });

      return createAddiction({
        addiction: newAddiction,
        user,
      })
        .catch(() => {
          storeRemove(newAddiction.id);
        })
        .finally(() => {
          setCreating(false);
        });
    },
    [modalStackNavigation, storeAdd, storeRemove, upload, user],
  );

  return {
    create,
    creating,
    imageUploadProgress,
    imageUploadStatus,
  };
};
