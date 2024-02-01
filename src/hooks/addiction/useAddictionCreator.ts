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
      if (!user) return;
      const { addictions } = new UserData(user.uid);
      const { image } = addiction;

      setCreating(true);
      const newAddiction = await addictions.create(addiction);
      setCreating(false);

      const imageUrl = image
        ? await upload(`users/${user.uid}/addictions/${newAddiction.id}`, image)
        : null;

      if (!hasNotificationsBlacklisted(newAddiction.id)) {
        addAllNotifications({ addiction: newAddiction });
      }

      return {
        ...newAddiction,
        image: imageUrl,
      };
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
