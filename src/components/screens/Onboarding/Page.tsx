import { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { OnboardingPage } from './onboardingPages';

import { Bold } from '@/components/ui/Text';
import { useTheme } from '@/theme';

const { width } = Dimensions.get('window');

const Page: FC<OnboardingPage> = ({
  description,
  title,
  illustration: Illustration,
}) => {
  const { colors } = useTheme();
  return (
    <View style={style.page}>
      <Illustration />
      <View style={style.texts}>
        <Bold style={style.text} variant="displaySmall">
          {title}
        </Bold>
        <Text
          style={[style.text, { color: colors.outline }]}
          variant={'bodyMedium'}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  page: {
    paddingHorizontal: 50,
    width,
    justifyContent: 'space-evenly',
    paddingBottom: 60,
    flex: 1,
  },
  texts: {
    gap: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export { Page };
