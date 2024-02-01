import { useCallback, useState } from 'react';

import { addAllNotifications } from '../goal/achievementsNotifications';

import UserData from '@/services/data/userData';
import { useImageUpload } from '@/services/storage';
import { useAuthStore, useGlobalStore } from '@/store';

export const useAddictionCreator = () => {
  const { upload, task, uploadProgress } = useImageUpload();
  const { isBlacklisted: hasNotificationsBlacklisted } = useGlobalStore(
    state => ({
      isBlacklisted: state.isBlacklisted,
    }),
  );
  const [creating, setCreating] = useState(false);
  const user = useAuthStore(state => state.user);

  const create = useCallback(
    async (addiction: UnidentifiedAddiction) => {
      if (!user) return null;
      setCreating(true);

      const { addictions } = new UserData(user.uid);
      const { image } = addiction;
      const newAddiction = await addictions.create(addiction);

      if (!newAddiction) {
        return null;
      }

      if (!hasNotificationsBlacklisted(newAddiction.id)) {
        addAllNotifications({ addiction: newAddiction });
      }

      const imageDownloadUrl = image
        ? await upload(`users/${user.uid}/addictions/${newAddiction.id}`, image)
        : null;

      const updatedAddiction = await addictions.update(newAddiction.id, {
        image: imageDownloadUrl,
      });

      if (!updatedAddiction) {
        return null;
      }

      setCreating(false);
      return updatedAddiction;
    },
    [user, hasNotificationsBlacklisted, upload],
  );

  return {
    create,
    creating,
    uploadProgress,
    task,
  };
};
