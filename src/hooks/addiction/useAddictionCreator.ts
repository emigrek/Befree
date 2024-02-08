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

      if (!hasNotificationsBlacklisted(newAddiction.id)) {
        addAllNotifications({ addiction: newAddiction });
      }

      if (image) {
        const downloadUrl = await upload(
          `users/${user.uid}/addictions/${newAddiction.id}`,
          image,
        );

        await addictions.update(newAddiction.id, {
          image: downloadUrl,
        });
      }

      setCreating(false);

      return newAddiction;
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
