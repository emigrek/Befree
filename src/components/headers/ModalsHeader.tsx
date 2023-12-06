import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { useTheme } from '@/theme';

const ModalsHeader: FC<StackHeaderProps> = ({
  options,
  route,
  back,
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
      {back ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <View style={style.container}>
        <View style={style.center}>
          <Text variant={'titleMedium'} style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </View>
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

export { ModalsHeader };
