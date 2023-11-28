import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Bold } from '@/components/ui/Text';

interface IconProps {
  name: string;
  color: string;
  size: number;
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
  return (
    <View style={style.icon}>
      <MCI name={'trophy'} {...props} />
      <Bold
        style={{
          color: props.color,
        }}
      >
        {name}
      </Bold>
    </View>
  );
};

export { Icon };

const style = StyleSheet.create({
  icon: {
    alignItems: 'center',
  },
});
