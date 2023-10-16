import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB } from 'react-native-paper';

import { useTheme } from '@/theme';

const FAB = forwardRef<
  ElementRef<typeof PaperFAB>,
  ComponentPropsWithoutRef<typeof PaperFAB>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <PaperFAB
      ref={ref}
      style={[
        styles.fab,
        {
          backgroundColor: colors.primary,
        },
        style,
      ]}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 75,
  },
});

export { FAB };
