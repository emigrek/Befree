import { useEffect, useState } from 'react';

import {
  UserDataManager,
  UserDataUpdateTypes,
} from '@/services/managers/firebase';
import { useAddictionsStore, useAuthStore } from '@/store';

export const useAddictionsSubscription = () => {
  const user = useAuthStore(state => state.user);
  const [userChanged, setUserChanged] = useState(false);
  const { reloadNotifications, setAddictions, setLoading } = useAddictionsStore(
    state => ({
      setAddictions: state.setAddictions,
      setLoading: state.setAddictionsLoading,
      reloadNotifications: state.reloadNotifications,
    }),
  );

  useEffect(() => {
    if (!user) {
      setAddictions([]);
      setUserChanged(true);
      return;
    }

    const userData = new UserDataManager(user.uid);

    setLoading(true);
    userData.initializeDataListeners((data, type) => {
      setAddictions(data);
      setLoading(false);

      if (userChanged && type === UserDataUpdateTypes.RELAPSE) {
        reloadNotifications();
        setUserChanged(false);
      }
    });

    return () => {
      userData.unsubscribeFromChanges();
    };
  }, [user, setAddictions, setLoading, userChanged, reloadNotifications]);
};
