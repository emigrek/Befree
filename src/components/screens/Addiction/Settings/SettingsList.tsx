import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

import { AddictionSetting } from './useSettings';

import { Divider } from '@/components/ui/Divider';

interface SettingsListProps {
  settings: AddictionSetting[];
}

const SettingsList: FC<SettingsListProps> = ({ settings }) => {
  const renderItem = useCallback(
    ({ item }: { item: AddictionSetting }) => (
      <List.Item
        title={item.name}
        description={item.description}
        left={item.left}
        right={item.right}
        onPress={item.onChange}
      />
    ),
    [],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <FlatList
      data={settings}
      renderItem={renderItem}
      ItemSeparatorComponent={renderDivider}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export { SettingsList };
