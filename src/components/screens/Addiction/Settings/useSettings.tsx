import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { removeAllNotifications } from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import UserData from '@/services/data/userData';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

export enum Section {
  PRIVACY = 'privacy',
  MANAGEMENT = 'management',
}

type SideProps =
  | ((props: { color: string; style?: Style | undefined }) => React.ReactNode)
  | undefined;

export interface AddictionSetting {
  id: number;
  section: Section;
  name: string;
  description?: string;
  onChange: () => Promise<void>;
  titleStyle?: StyleProp<TextStyle>;
  left?: SideProps;
  right?: SideProps;
}

interface UseSettingsProps {
  addiction: Addiction;
}

export const useSettings = ({ addiction }: UseSettingsProps) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const user = useAuthStore(state => state.user);
  const { removeBlacklist: removeAddictionFromNotificationsBlacklist } =
    useGlobalStore(state => ({
      removeBlacklist: state.removeBlacklist,
    }));

  const { colors } = useTheme();

  return useMemo<AddictionSetting[]>(
    () => [
      {
        id: 0,
        section: Section.PRIVACY,
        name: i18n.t([
          'modals',
          'addiction',
          'settings',
          'list',
          'hidden',
          'name',
        ]),
        description: i18n.t([
          'modals',
          'addiction',
          'settings',
          'list',
          'hidden',
          'description',
        ]),
        left: props => {
          return <List.Icon {...props} icon="eye-off-outline" />;
        },
        right: () => {
          return (
            <View pointerEvents={'none'}>
              <Switch color={colors.primary} value={addiction.hidden} />
            </View>
          );
        },
        onChange: async () => {
          if (!user) return;
          const { addictions } = new UserData(user.uid);

          await addictions.update(addiction.id, {
            hidden: !addiction.hidden,
          });
        },
      },
      {
        id: 1,
        section: Section.MANAGEMENT,
        name: i18n.t([
          'modals',
          'addiction',
          'settings',
          'list',
          'delete',
          'name',
        ]),
        description: i18n.t([
          'modals',
          'addiction',
          'settings',
          'list',
          'delete',
          'description',
        ]),
        left: props => {
          return <List.Icon {...props} icon="trash-can" />;
        },
        titleStyle: {
          color: colors.error,
        },
        onChange: async () => {
          if (!user) return;
          const { addictions } = new UserData(user.uid);

          removeAllNotifications({ addictionId: addiction.id });
          removeAddictionFromNotificationsBlacklist(addiction.id);
          navigation.navigate('BottomTabs', { screen: 'Addictions' });

          await addictions.delete(addiction.id);
        },
      },
    ],
    [
      addiction,
      user,
      removeAddictionFromNotificationsBlacklist,
      navigation,
      colors,
    ],
  );
};
