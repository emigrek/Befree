import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Divider } from '@/components/ui/Divider';
import { useTheme } from '@/theme';

const SectionHeader = ({ title }: { title: string }) => {
  const { colors } = useTheme();

  return (
    <View style={style.sectionHeaderContainer}>
      <Divider style={style.sectionHeaderDivider} />
      <Text
        variant={'bodySmall'}
        style={{
          color: colors.outline,
          paddingHorizontal: 3,
          paddingVertical: 16,
        }}
      >
        {title}
      </Text>
      <Divider style={style.sectionHeaderDivider} />
    </View>
  );
};

export { SectionHeader };

const style = StyleSheet.create({
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionHeaderDivider: {
    flex: 1,
  },
});
