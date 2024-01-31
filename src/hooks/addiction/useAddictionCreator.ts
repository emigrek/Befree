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
    async (addiction: UnidentifiedAddiction, firstRelapseDate?: Date) => {
      if (!user) return;
      const { addictions } = new UserData(user.uid);
      const { image } = addiction;

      setCreating(true);
      const newAddictionId = await addictions.create(
        addiction,
        firstRelapseDate,
      );
      setCreating(false);
      const imageUrl = image
        ? await upload(`users/${user.uid}/addictions/${newAddictionId}`, image)
        : null;

      const newAddiction = {
        ...addiction,
        id: newAddictionId,
        image: imageUrl,
        createdAt: new Date(),
      };

      if (!hasNotificationsBlacklisted(newAddictionId)) {
        addAllNotifications({ addiction: newAddiction });
      }

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
