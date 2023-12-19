import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { useTheme } from '@/theme';

const AddictionHeader: FC<BottomTabHeaderProps> = ({
  options,
  route,
  navigation,
}) => {
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header
      style={[
        style.header,
        {
          backgroundColor: colors.background,
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
        {options.headerRight &&
          options.headerRight({
            pressColor: options.headerPressColor,
            tintColor: options.headerTintColor,
          })}
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
