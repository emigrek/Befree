import {
  CommonActions,
  StackActions,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { FC, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import style from './style';

import i18n from '@/i18n';
import {
  CreationStackNavigationProp,
  CreationStackParamList,
  ModalStackNavigationProp,
} from '@/navigation/types';

const Navigation: FC<StackHeaderProps> = props => {
  const creationStackNavigation = useNavigation<CreationStackNavigationProp>();
  const modalStackNavigation = useNavigation<ModalStackNavigationProp>();

  const isLastScreenInStack = useMemo(() => {
    const currentRouteName =
      creationStackNavigation.getState().routes[
        creationStackNavigation.getState().index
      ].name;
    const currentRouteIndex = creationStackNavigation
      .getState()
      .routeNames.indexOf(currentRouteName);
    const nextRouteName =
      creationStackNavigation.getState().routeNames[currentRouteIndex + 1];

    return !nextRouteName;
  }, [creationStackNavigation]);

  const pushNext = useCallback(
    () => (state: StackNavigationState<CreationStackParamList>) => {
      const currentRouteName = state.routes[state.index].name;
      const currentRouteIndex = state.routeNames.indexOf(currentRouteName);
      const nextRouteName = state.routeNames[currentRouteIndex + 1];

      if (nextRouteName) {
        return StackActions.push(nextRouteName);
      } else {
        modalStackNavigation.navigate('BottomTabs', {
          screen: 'Addictions',
        });
        return CommonActions.reset(state);
      }
    },
    [modalStackNavigation],
  );

  const back = useCallback(() => {
    creationStackNavigation.goBack();
  }, [creationStackNavigation]);

  const next = useCallback(() => {
    creationStackNavigation.dispatch(pushNext());
  }, [creationStackNavigation, pushNext]);

  return (
    <View style={style.floating} {...props}>
      <Button onPress={back}>{i18n.t(['labels', 'back'])}</Button>
      <Button mode="contained" onPress={next}>
        {isLastScreenInStack
          ? i18n.t(['labels', 'add'])
          : i18n.t(['labels', 'next'])}
      </Button>
    </View>
  );
};

export default Navigation;
