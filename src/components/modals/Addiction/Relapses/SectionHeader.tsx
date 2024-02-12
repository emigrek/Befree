import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '@/theme';

const SectionHeader = ({ title }: { title: string }) => {
  const { colors } = useTheme();

  return (
    <View style={style.sectionHeaderContainer}>
      <Text
        variant={'bodySmall'}
        style={{
          color: colors.outline,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export { SectionHeader };

const style = StyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 16,
    gap: 10,
  },
});
