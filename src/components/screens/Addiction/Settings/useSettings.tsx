import { useMemo } from 'react';
import { View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import i18n from '@/i18n';
import UserData from '@/services/data/userData';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

export enum Section {
  PRIVACY = 'privacy',
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
  left?: SideProps;
  right?: SideProps;
}

interface UseSettingsProps {
  addiction: Addiction;
}

export const useSettings = ({ addiction }: UseSettingsProps) => {
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();

  return useMemo<AddictionSetting[]>(() => {
    return [
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
          const { addictions } = UserData.getInstance(user.uid);

          await addictions.update(addiction.id, {
            hidden: !addiction.hidden,
          });
        },
      },
    ];
  }, [addiction, user, colors]);
};
