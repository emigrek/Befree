import {
  CommonActions,
  StackActions,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import style from './style';

import i18n from '@/i18n';
import {
  CreationStackNavigationProp,
  CreationStackParamList,
} from '@/navigation/types';
import { useCreationWizardStore } from '@/store';

interface NavigationProps extends StackHeaderProps {
  startCallback?: () => void;
  completeCallback?: () => void;
}

const Navigation: FC<NavigationProps> = ({
  startCallback,
  completeCallback,
  ...props
}) => {
  const { name, errors, loading } = useCreationWizardStore(state => ({
    name: state.name,
    errors: state.errors,
    loading: state.loading,
  }));
  const creationStackNavigation = useNavigation<CreationStackNavigationProp>();

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
        completeCallback && completeCallback();
        return CommonActions.reset(state);
      }
    },
    [completeCallback],
  );

  const back = useCallback(() => {
    creationStackNavigation.goBack();
  }, [creationStackNavigation]);

  const next = useCallback(() => {
    creationStackNavigation.dispatch(pushNext());
  }, [creationStackNavigation, pushNext]);

  useEffect(() => {
    startCallback && startCallback();
  }, [startCallback]);

  return (
    <View style={style.floating} {...props}>
      <Button onPress={back} contentStyle={style.navigationButtonContent}>
        {i18n.t(['labels', 'back'])}
      </Button>
      <Button
        mode="contained"
        onPress={next}
        disabled={Boolean(errors.length) || !name}
        loading={loading}
        contentStyle={style.navigationButtonContent}
      >
        {isLastScreenInStack
          ? i18n.t(['labels', 'add'])
          : i18n.t(['labels', 'next'])}
      </Button>
    </View>
  );
};

export default Navigation;
