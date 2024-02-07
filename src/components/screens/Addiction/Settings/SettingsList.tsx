import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Section } from './Section';
import { AddictionSetting, Section as SectionEnum } from './useSettings';

interface SettingsListProps {
  settings: AddictionSetting[];
}

const SettingsList: FC<SettingsListProps> = ({ settings }) => {
  const sections = Object.values(SectionEnum);
  const sectionSettings = useCallback(
    (section: SectionEnum) =>
      settings.filter(setting => setting.section === section),
    [settings],
  );

  const renderItem = useCallback(
    ({ item }: { item: SectionEnum }) => (
      <Section section={item} settings={sectionSettings(item)} />
    ),
    [sectionSettings],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      ItemSeparatorComponent={renderDivider}
      keyExtractor={item => item}
    />
  );
};

export { SettingsList };
