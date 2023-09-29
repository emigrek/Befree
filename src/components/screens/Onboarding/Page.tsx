import { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { OnboardingPage } from '@/components/screens/Onboarding/onboardingPages';
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
      {Illustration && <Illustration />}
      <View>
        <Bold style={style.title} variant="displaySmall">
          {title}
        </Bold>
        <Text
          style={[style.description, { color: colors.outline }]}
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
    paddingHorizontal: 60,
    width,
    justifyContent: 'space-evenly',
    paddingBottom: 60,
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export { Page };
