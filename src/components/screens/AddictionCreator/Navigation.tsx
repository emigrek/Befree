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
  AddictionCreatorNavigationProp,
  AddictionCreatorParamList,
} from '@/navigation/types';
import { useAddictionCreatorStore } from '@/store';
import { NameSchema } from '@/validation/name.schema';

interface NavigationProps extends StackHeaderProps {
  startCallback?: () => void;
  completeCallback?: () => void;
}

const Navigation: FC<NavigationProps> = ({
  startCallback,
  completeCallback,
  ...props
}) => {
  const { name, loading } = useAddictionCreatorStore(state => ({
    name: state.name,
    loading: state.loading,
  }));
  const addictionCreatorNavigation =
    useNavigation<AddictionCreatorNavigationProp>();

  const isLastScreenInStack = useMemo(() => {
    const currentRouteName =
      addictionCreatorNavigation.getState().routes[
        addictionCreatorNavigation.getState().index
      ].name;
    const currentRouteIndex = addictionCreatorNavigation
      .getState()
      .routeNames.indexOf(currentRouteName);
    const nextRouteName =
      addictionCreatorNavigation.getState().routeNames[currentRouteIndex + 1];

    return !nextRouteName;
  }, [addictionCreatorNavigation]);

  const pushNext = useCallback(
    () => (state: StackNavigationState<AddictionCreatorParamList>) => {
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
    addictionCreatorNavigation.goBack();
  }, [addictionCreatorNavigation]);

  const next = useCallback(() => {
    addictionCreatorNavigation.dispatch(pushNext());
  }, [addictionCreatorNavigation, pushNext]);

  const isDisabled = useMemo(() => {
    return !NameSchema.safeParse({ name }).success;
  }, [name]);

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
        loading={loading}
        disabled={isDisabled}
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
