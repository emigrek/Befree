import { NavigationContainer } from '@react-navigation/native';

import { useDynamicTheme } from './theme';

import { Root as RootStack } from '@/navigation';

const Root = () => {
  return (
    <NavigationContainer theme={useDynamicTheme()}>
      <RootStack />
    </NavigationContainer>
  );
};

export default Root;
