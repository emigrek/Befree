import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Bold } from '@/components/ui/Text';
import { useTheme } from '@/theme';

interface HeaderProps {
  title?: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.texts}>
      {title && <Bold variant="titleLarge">{title}</Bold>}
      {description && (
        <Text variant="bodyMedium" style={[{ color: colors.onSurfaceVariant }]}>
          {description}
        </Text>
      )}
    </View>
  );
};

export { Header };

const styles = StyleSheet.create({
  texts: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
});
