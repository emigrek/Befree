import { useEffect, useState } from 'react';

type PersistListener<T> = (state: T) => void;

type PartialPersistStore<T> = {
  hasHydrated: () => boolean;
  onFinishHydration: (fn: PersistListener<T>) => () => void;
};

interface PersistedStoreHydrationState<T> {
  persistStore: PartialPersistStore<T>;
  onFinishHydration?: () => Promise<void>;
}

export const usePersistedStoreHydrationState = <T>({
  persistStore,
  onFinishHydration,
}: PersistedStoreHydrationState<T>) => {
  const [isHydrated, setIsHydrated] = useState(persistStore.hasHydrated());

  useEffect(() => {
    const unsubscribe = persistStore.onFinishHydration(() => {
      setIsHydrated(true);
      onFinishHydration && onFinishHydration();
    });

    return unsubscribe;
  }, [isHydrated, persistStore, onFinishHydration]);

  return isHydrated;
};
