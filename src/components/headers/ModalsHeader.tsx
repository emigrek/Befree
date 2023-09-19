import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderProps, StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import { ModalsStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

type ModalsStackNavigationProp = StackNavigationProp<ModalsStackParamList>;

const ModalsHeader: FC<StackHeaderProps> = ({ options, route }) => {
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  const { goBack, canGoBack } = useNavigation<ModalsStackNavigationProp>();

  return (
    <Appbar.Header
      style={[
        style.header,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {canGoBack() ? <Appbar.BackAction onPress={goBack} /> : null}
      <Appbar.Content title={title} />
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
