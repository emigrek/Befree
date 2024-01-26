import { useNavigation } from '@react-navigation/native';
import { customAlphabet } from 'nanoid/non-secure';
import { useCallback, useState } from 'react';

import { addAllNotifications } from '../goal/achievementsNotifications';

import { ModalStackNavigationProp } from '@/navigation/types';
import { createAddiction } from '@/services/queries';
import { useImageUpload } from '@/services/storage';
import { useAuthStore, useGlobalStore } from '@/store';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export const useAddictionCreator = () => {
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();
  const { upload, task, uploadProgress } = useImageUpload();
  const {
    storeAddAddiction,
    storeRemoveAddiction,
    isBlacklisted: hasNotificationsBlacklisted,
  } = useGlobalStore(state => ({
    storeAddAddiction: state.addAddiction,
    storeRemoveAddiction: state.removeAddiction,
    isBlacklisted: state.isBlacklisted,
  }));
  const [creating, setCreating] = useState(false);
  const user = useAuthStore(state => state.user);

  const create = useCallback(
    async (addiction: UnidentifiedAddiction) => {
      if (!user) return;

      const { name, image, tags } = addiction;
      const { uid } = user;

      const addictionId = nanoid();

      setCreating(true);

      const imageUrl = image
        ? await upload(`users/${uid}/addictions/${addictionId}`, image)
        : null;

      const newAddiction = {
        id: addictionId,
        name,
        image: imageUrl,
        tags,
        hidden: false,
        createdAt: new Date(),
      };

      storeAddAddiction(newAddiction);

      if (!hasNotificationsBlacklisted(addictionId)) {
        addAllNotifications({ addiction: newAddiction });
      }

      modalStackNavigation.navigate('BottomTabs', {
        screen: 'Addictions',
      });

      createAddiction({
        addiction: newAddiction,
        user,
      }).catch(() => {
        storeRemoveAddiction(newAddiction.id);
      });

      setCreating(false);
    },
    [
      modalStackNavigation,
      storeAddAddiction,
      storeRemoveAddiction,
      upload,
      user,
      hasNotificationsBlacklisted,
    ],
  );

  return {
    create,
    creating,
    uploadProgress,
    task,
  };
};
