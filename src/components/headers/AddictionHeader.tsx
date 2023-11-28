import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { EditAction } from '@/components/ui/EditAction';
import { AddictionStackNavigationProp } from '@/navigation/types';
import { useTheme } from '@/theme';

const AddictionHeader: FC<BottomTabHeaderProps> = ({ options, route }) => {
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  const { goBack, canGoBack } = useNavigation<AddictionStackNavigationProp>();

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
      <View style={style.container}>
        <View style={style.center}>
          <Text variant={'titleLarge'} style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </View>
        <EditAction />
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
