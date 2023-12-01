import { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Bold } from '@/components/ui/Text';

interface IconProps extends ViewProps {
  name: string;
  color: string;
  size: number;
  fontSize: number;
}

const Icon: FC<IconProps> = ({
  name,
  color,
  size,
  fontSize,
  style: containerStyle,
  ...props
}) => {
  return (
    <View style={[style.icon, containerStyle]} {...props}>
      <MCI name={'trophy'} size={size} color={color} />
      <Bold
        style={{
          color,
          fontSize,
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
