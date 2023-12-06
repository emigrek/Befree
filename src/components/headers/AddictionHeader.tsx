import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { EditAction } from '@/components/ui/EditAction';
import { useTheme } from '@/theme';

const AddictionHeader: FC<BottomTabHeaderProps> = ({
  options,
  route,
  navigation,
}) => {
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  const isInitial = route.name === 'Progress';

  return (
    <Appbar.Header
      style={[
        style.header,
        {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <View style={style.container}>
        <View style={style.center}>
          <Text variant={'titleLarge'} style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </View>
        {isInitial && <EditAction />}
      </View>
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
  },
});

export { AddictionHeader };
