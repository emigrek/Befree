import React, { FC } from 'react';
import { View } from 'react-native';
import { Banner, Text } from 'react-native-paper';

import { Bold } from '../Text';

import { useNetState } from '@/hooks/useNetState';
import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

interface OfflineBannerProps {
  absolute?: boolean;
}

const OfflineBanner: FC<OfflineBannerProps> = ({ absolute }) => {
  const net = useNetState();
  const { colors } = useTheme();
  const { offlineAcknowledged, setOfflineAcknowledged } = useGlobalStore(
    state => ({
      offlineAcknowledged: state.offlineAcknowledged,
      setOfflineAcknowledged: state.setOfflineAcknowledged,
    }),
  );

  return (
    <Banner
      visible={!net?.isConnected && !offlineAcknowledged}
      contentStyle={{
        position: absolute ? 'absolute' : 'relative',
        backgroundColor: colors.card,
        elevation: 10,
      }}
      actions={[
        {
          label: i18n.t(['banners', 'offline', 'acknowledge']),
          onPress: () => setOfflineAcknowledged(true),
        },
      ]}
      icon={'wifi-off'}
    >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View>
          <Bold>{i18n.t(['banners', 'offline', 'title'])}</Bold>
        </View>
        <View>
          <Text>{i18n.t(['banners', 'offline', 'description'])}</Text>
        </View>
      </View>
    </Banner>
  );
};

export { OfflineBanner };
