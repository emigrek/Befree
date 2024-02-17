import { useCallback, useState } from 'react';

import { useImageUpload } from '@/hooks/storage';
import { UserDataManager } from '@/services/managers/firebase';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';
import { useAuthStore } from '@/store';

export const useAddictionCreator = () => {
  const { upload, task, uploadProgress } = useImageUpload();
  const [creating, setCreating] = useState(false);
  const user = useAuthStore(state => state.user);

  const create = useCallback(
    async (addiction: UnidentifiedAddiction) => {
      if (!user) return null;

      setCreating(true);

      const { addictions } = new UserDataManager(user.uid);
      const { image } = addiction;
      const newAddiction = await addictions.create(addiction);

      const isBlacklisted =
        await NotificationsBlacklistManager.getInstance().has(newAddiction.id);
      if (!isBlacklisted) {
        await new AchievementNotificationsManager(newAddiction).scheduleAll();
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
    [user, upload],
  );

  return {
    create,
    creating,
    uploadProgress,
    task,
  };
};
