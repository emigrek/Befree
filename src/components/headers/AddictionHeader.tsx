import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { style } from './style';

const AddictionHeader: FC<BottomTabHeaderProps> = ({
  options,
  route,
  navigation,
}) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={style.header}>
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

export { AddictionHeader };
