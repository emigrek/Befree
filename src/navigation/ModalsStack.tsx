import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import { AddictionStack } from './AddictionStack';
import { BottomTabsStack } from './BottomTabsStack';
import { HiddenAddictionsBottomTabsStack } from './HiddenAddictionsBottomTabsStack';
import { ModalsStackParamList } from './types';

import { ModalsHeader } from '@/components/headers';
import {
  AchievementScreen,
  AddictionCreatorScreen,
  AddictionEditScreen,
  RelapseCreatorScreen,
  RelapseEditScreen,
  RelapseScreen,
  SortingScreen,
} from '@/components/modals';
import i18n from '@/i18n';

const Navigator = createStackNavigator<ModalsStackParamList>();

const ModalsStack = () => {
  const { height } = useWindowDimensions();

  return (
    <Navigator.Navigator
      initialRouteName="BottomTabs"
      screenOptions={({ route }) => {
        return {
          header: props => <ModalsHeader {...props} />,
          title: i18n.t(['modals', route.name.toLowerCase(), 'label']),
          ...TransitionPresets.SlideFromRightIOS,
        };
      }}
    >
      <Navigator.Screen
        name="BottomTabs"
        options={{
          headerShown: false,
        }}
        component={BottomTabsStack}
      />
      <Navigator.Group
        screenOptions={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureResponseDistance: height / 1.5,
        }}
      >
        <Navigator.Screen
          name="AddictionCreator"
          component={AddictionCreatorScreen}
        />
        <Navigator.Screen
          name="RelapseCreator"
          component={RelapseCreatorScreen}
        />
        <Navigator.Screen
          name="Addiction"
          component={AddictionStack}
          options={{
            headerShown: false,
            title: undefined,
          }}
        />
        <Navigator.Screen
          name="HiddenAddictions"
          component={HiddenAddictionsBottomTabsStack}
        />
        <Navigator.Screen name="Achievement" component={AchievementScreen} />
        <Navigator.Screen
          name="AddictionEdit"
          component={AddictionEditScreen}
        />
        <Navigator.Screen name="RelapseEdit" component={RelapseEditScreen} />
        <Navigator.Screen name="Sorting" component={SortingScreen} />
        <Navigator.Screen name="Relapse" component={RelapseScreen} />
      </Navigator.Group>
    </Navigator.Navigator>
  );
};

export { ModalsStack };
