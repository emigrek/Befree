import { useMemo } from 'react';
import { List, Switch } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

import { editAddiction } from '@/services/queries';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

type SideProps =
  | ((props: { color: string; style?: Style | undefined }) => React.ReactNode)
  | undefined;

export interface AddictionSetting {
  id: number;
  name: string;
  description: string;
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
        name: 'Hidden',
        description: 'Hide this addiction from the main screen',
        left: props => {
          return <List.Icon {...props} icon="eye-off-outline" />;
        },
        right: props => {
          return (
            <Switch
              {...props}
              color={colors.primary}
              value={addiction.hidden}
            />
          );
        },
        onChange: async () => {
          if (!user) return;

          await editAddiction({
            user,
            id: addiction.id,
            addiction: {
              hidden: !addiction.hidden,
            },
          });
        },
      },
    ];
  }, [addiction, user, colors]);
};
