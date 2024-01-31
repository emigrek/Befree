import { useEffect } from 'react';

import UserData from '@/services/data/userData';
import { useAuthStore, useGlobalStore } from '@/store';

export const useAddictionsSubscription = () => {
  const user = useAuthStore(state => state.user);
  const { setAddictions, setLoading } = useGlobalStore(state => ({
    addictions: state.addictions,
    setAddictions: state.setAddictions,
    loading: state.addictionsLoading,
    setLoading: state.setAddictionsLoading,
  }));

  useEffect(() => {
    if (!user) return;
    const userData = new UserData(user.uid);

    setLoading(true);

    userData.initializeDataListeners(data => {
      setAddictions(data);
      setLoading(false);
    });

    return () => {
      userData.unsubscribeFromChanges();
    };
  }, [setAddictions, user, setLoading]);
};
