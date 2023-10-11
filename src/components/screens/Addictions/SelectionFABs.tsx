import React, { useCallback } from 'react';

import { FAB } from '@/components/ui/FAB';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { removeAddiction } from '@/services/firestore';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const SelectionFABs = () => {
  const { colors } = useTheme();
  const user = useAuthStore(state => state.user);
  const { selected, setSelected } = useGlobalStore(state => ({
    selected: state.selected,
    setSelected: state.setSelected,
    storeRemove: state.remove,
    storeAdd: state.add,
  }));
  const { sortedAddictions } = useAddictions({ user: user! });

  const handleSelectedDelete = useCallback(() => {
    if (!user) return;

    const deletionPromise = selected.map(id => {
      const addiction = sortedAddictions.find(addiction => addiction.id === id);
      if (!addiction) return Promise.resolve();
      return removeAddiction({ user, id });
    });

    Promise.all(deletionPromise).then(() => {
      setSelected([]);
    });
  }, [selected, user, sortedAddictions, setSelected]);

  const handleSelectionCancel = useCallback(() => {
    setSelected([]);
  }, [setSelected]);

  if (selected.length <= 0) return null;

  return (
    <>
      <FAB
        icon="close"
        customSize={50}
        style={{
          bottom: 160,
          right: 30,
          backgroundColor: colors.secondaryContainer,
        }}
        onPress={handleSelectionCancel}
        color={colors.onSecondaryContainer}
        mode={'flat'}
      />
      <FAB
        icon="trash-can"
        customSize={50}
        style={{
          bottom: 100,
          right: 30,
          backgroundColor: colors.secondaryContainer,
        }}
        onPress={handleSelectedDelete}
        color={colors.onSecondaryContainer}
        mode={'flat'}
      />
    </>
  );
};

export { SelectionFABs };
